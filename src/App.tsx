import './App.css';
import OmikujiButton from './OmikujiButton';
import UltraOmikujiButton from './UltraOmikujiButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>おみくじアプリ</h1>
        <h2>おみくじ（1回）</h2>
        <OmikujiButton />
        <h2>おみくじ（5回）</h2>
        <UltraOmikujiButton />
      </header>
    </div>
  );
}

export default App;
