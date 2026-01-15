import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Introduction from './components/Introduction'
import FirstProposal from './components/FirstProposal'
import MoreSettings1stProposal from './components/MoreSettings1stProposal'
import SecondProposal from './components/SecondProposal'
import MoreSettings2ndProposal from './components/MoreSettings2ndProposal'
import Invoice from './components/Invoice'
import MoreCharges from './components/MoreCharges'
import MoreChargesShowcase from './components/MoreChargesShowcase'
import BillDetail from './components/BillDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/1st-proposal" element={<FirstProposal />} />
        <Route path="/1st-proposal/more-settings" element={<MoreSettings1stProposal />} />
        <Route path="/2nd-proposal" element={<SecondProposal />} />
        <Route path="/2nd-proposal/more-settings" element={<MoreSettings2ndProposal />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/more-charges" element={<MoreCharges />} />
        <Route path="/showcase/more-charges-item" element={<MoreChargesShowcase />} />
        <Route path="/bill-detail" element={<BillDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
