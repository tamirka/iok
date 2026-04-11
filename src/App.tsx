/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Home } from './pages/Home';
import { Templates } from './pages/Templates';
import { Tools } from './pages/Tools';
import { ToolViewer } from './pages/ToolViewer';
import { Filmmaking } from './pages/Filmmaking';
import { Portfolio } from './pages/Portfolio';
import { PortfolioViewer } from './pages/PortfolioViewer';
import { Admin } from './pages/Admin';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Cursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/ai-services" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:slug" element={<Templates />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:slug" element={<Tools />} />
        <Route path="/tool-viewer/:slug" element={<ToolViewer />} />
        <Route path="/filmmaking" element={<Filmmaking />} />
        <Route path="/portfolio-viewer/:slug" element={<PortfolioViewer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}
