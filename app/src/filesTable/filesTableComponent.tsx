import React, { useState } from 'react';
import parse from "csv-parse";
import csvStringify from 'csv-stringify';
import { defaultRowFilter, ColMap, defaultRowConversion } from './conversions';
import { rejects } from 'assert';

type ReadyFile = {
  id: string,
  name: string | undefined;
  size: number | undefined;
  type: string | undefined;
  lastModified: number | undefined;
  text: string | undefined;
  parsed: any[] | undefined;
  converted: any[] | undefined;
}

export const FileTable = () => {
  const [files, setFiles] = useState([] as ReadyFile[]);

  const onDrop = async (event: React.DragEvent) => {
    console.log(event)
    event.preventDefault();
    event.stopPropagation();
    console.log(event.dataTransfer.files)
    if (!event.dataTransfer.files.length) {
      console.error('NO FILES DROPPED')
      return;
    }
    const items = ((items: DataTransferItemList) => {
      const arr = [];
      for (let i = 0; i < items.length; i++) {
        arr.push(items[i].getAsFile());
      }
      return arr;
    })(event.dataTransfer.items);
    console.log(items)

    const readyFiles = await Promise.all(items.map(async item => {
      const text = await item?.text();
      console.log(typeof parse)
      const parsed = await new Promise((resolve, reject) => {
        if (typeof text !== 'string') {
          reject();
          return;
        }
        parse(text, {
        }, (err, output) => {
          if (err) {
            console.error(err);
            reject();
            return;
          }
          resolve(output);
        });
      })
      const id = Math.random().toString();
      return {
        id,
        name: item?.name,
        size: item?.size,
        type: item?.type,
        lastModified: item?.lastModified,
        text,
        parsed,
      } as ReadyFile;
    }));
    console.log('READY FILES', readyFiles)

    setFiles(readyFiles);
  }

  const onDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('ENTER', event)

  }

  const eventPrevent = (number = 0) => (event: React.DragEvent) => {
    event.preventDefault();
    // event.stopPropagation();
    console.log('PREVENT', number, event)
  }

  const handleConvertClick = (file: ReadyFile) => async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('CONVERT', file)
    if (!file.parsed || file.parsed.length === 0) return;
    const colMap = ColMap.mapColumns(file.parsed[0]);
    const filteredRows = file.parsed.filter(defaultRowFilter({ withHeader: true, colMap, }));
    console.log(filteredRows);
    const converdedRows = await Promise.all(filteredRows.map((row, idx) => defaultRowConversion(row, {
      isHeader: idx === 0,
      colMap,
    })));
    console.log(converdedRows);
    file.converted = converdedRows;
    const newFiles = files.map(oldFile => oldFile.id === file.id ? file : oldFile);
    setFiles(newFiles);
  }

  const handleDownloadClick = (file: ReadyFile) => async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!file.converted) {
      console.error('File needs to be converted first');
      return;
    }
    const csv = await new Promise<string>((resolve, reject) => {
      if (!file.converted) {
        reject();
        return;
      }
      csvStringify(file.converted, (err, output) => {
        if (err) {
          console.error(err);
          reject();
          return;
        }
        resolve(output);
      })
    });
    console.log(csv);
    download(file.name || 'converted.csv', csv);
  }

  const download = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div
      onDrop={onDrop}
      onDropCapture={eventPrevent(1)}
      onDragEnter={onDragEnter}
      onDragOver={eventPrevent(2)}
    >
      <table>
        <tbody>
          {
            files.map((file, key) => (
              <tr key={key}>
                <td>{file.name}</td>
                <td onClick={handleConvertClick(file)}>Convert</td>
                <td onClick={handleDownloadClick(file)}>Save</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p>
        Drop files to convert.
      </p>
    </div>
  )
}