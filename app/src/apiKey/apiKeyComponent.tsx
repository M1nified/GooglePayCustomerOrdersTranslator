import React, { useState } from 'react';

type ApiKeyProps = {
  apiKey: string | null,
  onSetApiKey: (apiKey: string | null) => any,
}

export const ApiKey = ({ apiKey, onSetApiKey, }: ApiKeyProps) => {

  const [formApiKey, setFormApiKey] = useState(apiKey);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSetApiKey(formApiKey);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="API KEY"
        name="apiKey"
        value={formApiKey || ''}
        onChange={event => setFormApiKey(event.target.value)}
      />
      <input type="submit" />
    </form>
  )
}

ApiKey.defaultProps = {
  apiKey: null,
  onSetApiKey: () => { },
}