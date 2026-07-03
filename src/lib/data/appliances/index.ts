import { Appliance, CardAppliance, ApplianceCategory } from '@/types/appliance';
import { samsungAppliances } from './samsung';
import { lgAppliances } from './lg';
import { carrierAppliances } from './carrier';
import { tclAppliances } from './tcl';
import { haierAppliances } from './haier';
import { dysonAppliances } from './dyson';
import { shinilAppliances } from './shinil';
import { xiaomiAppliances } from './xiaomi';
import { cowayAppliances } from './coway';
import { winixAppliances } from './winix';
import { skmagicAppliances } from './skmagic';
import { cuckooAppliances } from './cuckoo';
import { roborockAppliances } from './roborock';

export const allAppliances: Appliance[] = [
  ...samsungAppliances,
  ...lgAppliances,
  ...carrierAppliances,
  ...tclAppliances,
  ...haierAppliances,
  ...dysonAppliances,
  ...shinilAppliances,
  ...xiaomiAppliances,
  ...cowayAppliances,
  ...winixAppliances,
  ...skmagicAppliances,
  ...cuckooAppliances,
  ...roborockAppliances,
];

export function getApplianceBySlug(slug: string): Appliance | undefined {
  return allAppliances.find((a) => a.slug === slug);
}

export function getAppliancesByCategory(category: ApplianceCategory): Appliance[] {
  return allAppliances.filter((a) => a.category === category);
}

export function getAppliancesByBrand(brand: string): Appliance[] {
  return allAppliances.filter((a) => a.brand === brand);
}

export function getCardAppliances(): CardAppliance[] {
  return allAppliances
    .filter((a) => a.price > 0)
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      brand: a.brand,
      name: a.name,
      category: a.category,
      rating: a.rating,
      image: a.image,
      price: a.price,
      oneliner: a.oneliner,
      status: a.status,
      tags: a.tags,
      specs: {
        energyEfficiency: a.specs.energyEfficiency,
        performance: a.specs.performance,
        noise: a.specs.noise,
        convenience: a.specs.convenience,
        durability: a.specs.durability,
      },
    }))
    .sort((a, b) => b.rating - a.rating);
}

export function getSimilarProducts(slug: string): CardAppliance[] {
  const appliance = getApplianceBySlug(slug);
  if (!appliance) return [];
  return appliance.similarProducts
    .map((s) => allAppliances.find((a) => a.slug === s))
    .filter((a): a is Appliance => !!a)
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      brand: a.brand,
      name: a.name,
      category: a.category,
      rating: a.rating,
      image: a.image,
      price: a.price,
      oneliner: a.oneliner,
      status: a.status,
      tags: a.tags,
      specs: {
        energyEfficiency: a.specs.energyEfficiency,
        performance: a.specs.performance,
        noise: a.specs.noise,
        convenience: a.specs.convenience,
        durability: a.specs.durability,
      },
    }));
}

export function getAllCategories(): ApplianceCategory[] {
  return [...new Set(allAppliances.map((a) => a.category))];
}

export function getAllBrands(): string[] {
  return [...new Set(allAppliances.map((a) => a.brand))];
}
