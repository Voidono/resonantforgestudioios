import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Zap } from "lucide-react";
import { useState } from "react";
import ClassificationMatrix from "@/components/classification/ClassificationMatrix";
import EstimateSummary from "@/components/classification/EstimateSummary";
import AssetRegistryTabs from "@/components/classification/AssetRegistryTabs";

const defaultAssets = ["ASSET 01", "ASSET 02", "ASSET 03", "ASSET 04", "ASSET 05", "ASSET 06"];

const AssetClassification = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<{ scope: number; complexity: number } | null>(null);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const handleSelect = (scope: number, complexity: number) => {
    setSelected({ scope, complexity });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-[72px]" />

      {/* Sub-nav */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center gap-8 py-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-bold">BACK</span>
          </button>
        </div>
      </div>

      <section className="flex-1 px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
        {/* Top row: Branding | Asset Registry | Estimate Summary header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left - Branding + Total */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-serif font-bold tracking-wider text-foreground">RESONANT FORGE</h1>
                <p className="text-[9px] tracking-[0.15em] uppercase font-sans text-muted-foreground">
                  ASSET INTAKE SYSTEM
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-muted-foreground mb-2">
                TOTAL INDUSTRIAL ASSETS
              </p>
              <div className="border border-border rounded-lg p-4 inline-block">
                <span className="text-3xl font-serif font-bold text-primary">
                  {String(defaultAssets.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Center - Asset Registry */}
          <div className="lg:col-span-5">
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <AssetRegistryTabs
                assets={defaultAssets}
                activeIndex={activeAssetIndex}
                onSelect={setActiveAssetIndex}
              />
            </div>
          </div>

          {/* Right - Estimate Summary */}
          <div className="lg:col-span-4">
            <div className="border border-border rounded-lg bg-card/40 p-5">
              <EstimateSummary
                selected={selected}
                activeAsset={`${defaultAssets[activeAssetIndex]?.replace(" ", "_")}_PROP`}
                totalAssets={defaultAssets.length}
                onConfirm={() => selected && navigate("/asset-intake")}
              />
            </div>
          </div>
        </div>

        {/* Bottom row: Matrix (takes most space) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <ClassificationMatrix selected={selected} onSelect={handleSelect} />
          </div>
          {/* Right column is absorbed by the estimate summary above on desktop, 
              but on smaller screens everything stacks */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssetClassification;
