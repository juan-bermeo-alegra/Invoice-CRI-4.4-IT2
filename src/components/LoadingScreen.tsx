import Bone from './Bone';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100 w-full flex flex-col">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center justify-center px-4 h-[60px] relative">
                    <button onClick={() => navigate('/')} className="w-6 h-6 absolute left-4">
                        <img src="/images/arrow-left.svg" alt="" className="w-full h-full" />
                    </button>
                    <h1 className="text-base font-semibold text-slate-900">Facturación</h1>
                    <div className="flex gap-3 items-center absolute right-4">
                        <button className="w-6 h-6">
                            <img src="/images/microphone.svg" alt="" className="w-full h-full" />
                        </button>
                        <button className="w-6 h-6">
                            <img src="/images/more.svg" alt="" className="w-full h-full" />
                        </button>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 bg-slate-200">
                    <div className="h-full bg-[#30aba9] w-0"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="px-4 pt-4">
                    <div className="bg-white rounded-t-xl pt-4">
                        {/* Logo Bone */}
                        <div className="flex justify-center mb-2">
                            <Bone width={94} height={52} borderRadius="12px" />
                        </div>

                        {/* Company Info Bones */}
                        <div className="flex flex-col items-center gap-1 mb-4 px-4">
                            <Bone width={120} height={12} borderRadius="4px" />
                            <Bone width={180} height={10} borderRadius="4px" />
                        </div>

                        {/* Numeración */}
                        <div className="px-4 mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Numeración<span className="text-[#30aba9] ml-0.5">*</span>
                            </label>
                            <Bone height={48} borderRadius="12px" />
                        </div>

                        {/* No. */}
                        <div className="px-4 pb-4 flex items-center gap-2">
                            <label className="text-lg font-bold text-slate-900 leading-[30px]">No.</label>
                            <Bone height={24} className="flex-1" borderRadius="8px" />
                        </div>
                    </div>

                    {/* Divider */}
                    <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

                    {/* Ajustes */}
                    <div className="bg-white">
                        <div className="px-4 py-3">
                            <h2 className="text-base font-bold text-slate-900">Ajustes</h2>
                        </div>

                        <div className="px-4 pt-2 flex flex-col gap-4 pb-4">
                            {/* Tipo de documento */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tipo de documento<span className="text-[#30aba9] ml-0.5">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <Bone height={48} className="flex-1" borderRadius="12px" />
                                    <Bone height={48} className="flex-1" borderRadius="12px" />
                                </div>
                            </div>

                            {/* Tipo de factura */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tipo de factura<span className="text-[#30aba9] ml-0.5">*</span>
                                </label>
                                <Bone height={48} borderRadius="12px" />
                            </div>

                            {/* Actividad económica */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Actividad económica<span className="text-[#30aba9] ml-0.5">*</span>
                                </label>
                                <Bone height={48} borderRadius="12px" />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

                    {/* Información de la factura */}
                    <div className="bg-white">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h2 className="text-base font-bold text-slate-900">Información de la factura</h2>
                        </div>

                        <div className="px-4 py-4">
                            {/* Cliente */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Cliente<span className="text-[#30aba9] ml-0.5">*</span>
                                </label>
                                <button className="text-[#30aba9] flex items-center gap-1 text-sm font-medium">
                                    + Selecciona a un cliente
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <img src="/images/Divider-bill-p3.svg" alt="" className="w-full" />

                    <div className="bg-white px-4 py-4 pt-2">
                        {/* Dates */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Fecha de creación<span className="text-[#30aba9] ml-0.5">*</span>
                            </label>
                            <Bone height={48} borderRadius="12px" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Fecha de vencimiento<span className="text-[#30aba9] ml-0.5">*</span>
                            </label>
                            <Bone height={48} borderRadius="12px" />
                        </div>

                        {/* Condición */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Condición<span className="text-[#30aba9] ml-0.5">*</span>
                            </label>
                            <div className="flex gap-2">
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                            </div>
                        </div>

                        {/* Medio de pago */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Medio de pago<span className="text-[#30aba9] ml-0.5">*</span>
                            </label>
                            <div className="flex gap-2">
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                                <Bone height={48} className="flex-1" borderRadius="12px" />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

                    {/* Product or Service */}
                    <div className="bg-white px-4 py-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Producto o servicio<span className="text-[#30aba9] ml-0.5">*</span>
                        </label>
                        <button className="text-[#30aba9] flex items-center gap-1 text-sm font-medium">
                            + Agrega un producto o servicio
                        </button>
                    </div>

                    {/* Divider */}
                    <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

                    {/* Más opciones */}
                    <div className="bg-white">
                        <div className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(148,163,184,0.4)]">
                            <h3 className="text-base font-medium text-slate-700">Más opciones</h3>
                            <img src="/images/Dropdown-Icon.svg" alt="" className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Divider */}
                    <img src="/images/divider-bill-p2.svg" alt="" className="w-full" />

                    {/* Summary */}
                    <div className="bg-white px-4 py-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-normal text-slate-500">Subtotal</span>
                            <span className="text-sm font-normal text-slate-500">₡0.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-normal text-[#30aba9]">Descuento</span>
                            <span className="text-sm font-normal text-[#30aba9]">-₡0.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-normal text-slate-500">IVA</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="#64748B" strokeWidth="1.5" />
                                    <path d="M8 7V11M8 5V5.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="text-sm font-normal text-slate-500">₡0.00</span>
                        </div>
                        <div className="h-px bg-slate-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Total</span>
                            <span className="text-2xl font-bold text-slate-900">₡0.00</span>
                        </div>
                    </div>

                    {/* Ending Bill */}
                    <div>
                        <img src="/images/Ending-bill.svg" alt="" className="w-full" />
                    </div>

                </div>
            </div>
        </div>
    );
}
