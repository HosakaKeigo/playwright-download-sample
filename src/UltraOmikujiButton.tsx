import React, { useState } from 'react';

// おみくじの結果の型定義
type OmikujiResult = '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶' | '大凶';

const UltraOmikujiButton: React.FC = () => {
  const [results, setResults] = useState<OmikujiResult[]>([]);
  const [disabled, setDisabled] = useState(false);

  const drawOmikuji = () => {
    setDisabled(true);
    const tempResults: OmikujiResult[] = [];
    for (let i = 0; i < 5; i++) {
      const result = drawSingleOmikuji();
      tempResults.push(result);
      downloadResultFile(result, i + 1);
    }
    setResults(tempResults);
  };

  const drawSingleOmikuji = (): OmikujiResult => {
    const results: OmikujiResult[] = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
    return results[Math.floor(Math.random() * results.length)];
  };

  const downloadResultFile = (result: OmikujiResult, serial: number) => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').substring(0, 15);
    const filename = `omikuji_${timestamp}_${serial}.txt`;
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <button onClick={drawOmikuji} disabled={disabled}>
        おみくじを引く
      </button>
      {results.length > 0 && <p>おみくじの結果: {results.join(', ')}</p>}
    </div>
  );
};

export default UltraOmikujiButton;
