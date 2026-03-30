import { memo } from "react";

interface AssetRegistryTabsProps {
  assets: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const AssetRegistryTabs = memo(({ assets, activeIndex, onSelect }: AssetRegistryTabsProps) => {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] uppercase font-sans font-bold text-muted-foreground mb-3">
        ASSET REGISTRY
      </h3>
      <div className="flex flex-wrap gap-2">
        {assets.map((asset, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`px-4 py-2 rounded text-[10px] tracking-[0.1em] uppercase font-sans font-bold border transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              {asset}
            </button>
          );
        })}
      </div>
    </div>
  );
});

AssetRegistryTabs.displayName = "AssetRegistryTabs";
export default AssetRegistryTabs;
