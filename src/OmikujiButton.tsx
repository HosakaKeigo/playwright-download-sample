import React, { useState } from 'react';

type OmikujiResult = '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶' | '大凶';

const OmikujiButton: React.FC = () => {
  const [result, setResult] = useState<OmikujiResult | null>(null);

  const drawOmikuji = () => {
    const results: OmikujiResult[] = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
    const selectedResult = results[Math.floor(Math.random() * results.length)];
    setResult(selectedResult);
    const timestamp = new Date().toISOString();
    const filename = `omikuji_${timestamp}.txt`;
    const blob = new Blob([selectedResult], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <button onClick={drawOmikuji} disabled={!!result}>
        おみくじを引く
      </button>
      {result && <p>おみくじの結果: {result}</p>}
    </div>
  );
};

export default OmikujiButton;
