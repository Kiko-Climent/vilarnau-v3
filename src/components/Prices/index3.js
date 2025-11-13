export default function PriceList3() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="w-[80%] max-w-5xl py-6 tracking-wider">
        <h1 className="text-lg">salon vilarnau | pricelist</h1>     
        <div className="flex flex-col gap-2">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right border-b border-black pb-2">
            <p className="text-left">Service / Leistung *</p>
            <p>short</p>
            <p>mid</p>
            <p>long</p>
          </div>

          {/* Row: Cuts */}
          <div className="flex flex-col -space-y-1 border-b border-black pb-2">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left font-medium">CUTS</p>
              <p>43.-</p>
              <p>48.-</p>
              <p>55.-</p>
            </div>
            <div className="flex justify-between">
              <p>fringe, beard trim, contour</p>
              <p>from 10.-</p>
            </div>
          </div>

          {/* Row: Styling */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right border-b border-black pb-2">
            <p className="text-left font-medium">STYLING</p>
            <p>30.-</p>
            <p>40.-</p>
            <p>50.-</p>
          </div>

          {/* Row: Colour */}
          <div className="flex flex-col -space-y-1 border-b border-black pb-2">
            <p className="font-medium">SEMI & PERMANENT COLOUR</p>
            <div className="flex justify-between">
              <p>Regrowth / Ansatz</p>
              <p>from 10.-</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Full Head / Ganzen Kopf</p>
              <p>43.-</p>
              <p>48.-</p>
              <p>55.-</p>
            </div>
          </div>

          {/* Row: Highlights */}
          <div className="flex flex-col -space-y-1 border-b border-black pb-2">
            <p className="font-medium">HIGHLIGHTS, BALAYAGE, PAINTINGS</p>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">T-Section & Touch-Up</p>
              <p>80.-</p>
              <p>90.-</p>
              <p>100.-</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Half Head / Halben Kopf</p>
              <p>100.-</p>
              <p>110.-</p>
              <p>120.-</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Full Head / Ganzen Kopf</p>
              <p>120.-</p>
              <p>130.-</p>
              <p>140.-</p>
            </div>
            <div className="flex justify-between">
              <p>Toner / Abmatierung</p>
              <p>from 30.-</p>
            </div>
          </div>

          {/* Row: Bleach */}
          <div className="flex flex-col -space-y-1 border-b border-black pb-2">
            <p className="font-medium">BLEACH</p>
            <div className="flex justify-between">
              <p>Regrowth / Ansatz</p>
              <p>from 80.-</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Full Head / Ganzen Kopf</p>
              <p>120.-</p>
              <p>140.-</p>
              <p>160.-</p>
            </div>
          </div>

          {/* Row: Packages */}
          <div className="flex flex-col -space-y-1 border-b border-black pb-2">
            <p className="font-medium">PACKAGES</p>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Cut & Styling</p>
              <p>60.-</p>
              <p>70.-</p>
              <p>80.-</p>
            </div>
            <div className="flex justify-between">
              <p>Cut & Regrowth Colour</p>
              <p>98.-</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-right">
              <p className="text-left">Cut & Full Head Colour</p>
              <p>113.-</p>
              <p>128.-</p>
              <p>145.-</p>
            </div>
            <div className="flex justify-between">
              <p>Cut & Highlights</p>
            </div>
            <div className="flex justify-between pl-6">
              <p>— T-Zone</p>
              <p>from 120.-</p>
            </div>
            <div className="flex justify-between pl-6">
              <p>— Half Head / Halben Kopf</p>
              <p>from 140.-</p>
            </div>
            <div className="flex justify-between pl-6">
              <p>— Full Head / Ganzen Kopf</p>
              <p>from 150.-</p>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col  text-xs">
            <p>* Prices may vary depending on the amount of work involved / additional materials used.</p>
            <p>* Je nach Aufwand / Mehrverbrauch an Materialien, können die Preise abweichen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
