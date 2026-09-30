/**
 * Photography registry.
 *
 * TODO: Every image below is a PLACEHOLDER from Unsplash (free licence, credit kept for courtesy).
 * Replace each entry with real Akshay Enterprise factory, machine and product photography:
 *   1. drop the file into /public/images/...
 *   2. change `src` to the local path (e.g. "/images/factory/turning-bay.jpg")
 *   3. update width/height/alt and set `credit` to undefined.
 * The site-wide duotone treatment (.img-treat) keeps mixed photos consistent.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: { name: string; profile: string; photo: string };
};

function unsplash(
  id: string,
  slug: string,
  username: string,
  name: string,
  width: number,
  height: number,
  alt: string,
): Photo {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`,
    alt,
    width,
    height,
    credit: {
      name,
      profile: `https://unsplash.com/@${username}`,
      photo: `https://unsplash.com/photos/${slug}`,
    },
  };
}

export const photos = {
  lathe: unsplash("1666634157070-6fd830fb5672", "metal-rod-machining-on-lathe-eaanLTG7TCU", "sven_daniel", "Sven Daniel", 6000, 4000, "Metal bar held in a lathe chuck while a cutting tool turns its diameter"),
  latheTurret: unsplash("1666618090858-fbcee636bd3e", "a-close-up-of-a-machine-DV_rG1mjDxs", "sven_daniel", "Sven Daniel", 6000, 4000, "Close-up of a lathe tool turret and chuck"),
  cncCutting: unsplash("1713371398484-cc4e4f6a262a", "a-machine-that-is-cutting-a-piece-of-metal-O5rSp_U-Pa0", "jelly1024", "Jelifer Maniago", 6000, 3376, "CNC spindle machining a metal workpiece"),
  millCutting: unsplash("1740209475472-aa7d280f7452", "a-machine-that-is-cutting-a-piece-of-metal-sxtClAGwRck", "zhengjialuminum", "aluminum Zheng ji", 5864, 3915, "Machining centre cutting a metal block"),
  brassParts: unsplash("1636624679304-232a9ca54736", "a-pile-of-gold-colored-objects-on-a-table-ALvgGEl8mEE", "mons", "Ivan Di", 5184, 3888, "Batch of machined brass components"),
  brassNuts: unsplash("1648113139950-4ea1237f6d84", "a-close-up-of-many-screws-and-nuts-Dh3EHnVJuR4", "dilliwalarider", "Shail Sharma", 3936, 2624, "Rows of brass threaded fittings and nuts"),
  partsOnDrawing: unsplash("1769147339214-076740872485", "two-metal-mechanical-parts-on-engineering-blueprints-SRqJ3eli-4I", "encatapd", "EnCata PD", 6000, 3376, "Two machined parts resting on engineering drawings"),
  caliperPart: unsplash("1758873263563-5ba4aa330799", "hands-using-a-digital-caliper-to-measure-metal-part-_luiFaaZU6k", "hanswestbeek", "Hans Westbeek", 3504, 2336, "Digital caliper measuring a machined metal part"),
  dialCaliper: unsplash("1563448448467-7fc866d214bb", "gray-dial-caliper-0Hmh461Goog", "aswin_anand", "Aswin Anand", 4656, 2620, "Dial caliper on a workbench"),
  factoryLine: unsplash("1717386255767-52643970d483", "a-factory-with-a-lot-of-machines-in-it-5hPe-Tr2wog", "homaappliances", "Homa Appliances", 6000, 4002, "Production hall with rows of machines"),
  factoryTeam: unsplash("1716194583732-0b9874234218", "a-large-machine-in-a-factory-with-people-working-on-it-0V9Ua2YsXfE", "homaappliances", "Homa Appliances", 6000, 4002, "Operators working at a production machine"),
  cargoShips: unsplash("1578575437130-527eed3abbec", "cargo-ships-docked-at-the-pier-during-day-CpsTAUPoScw", "andylid0", "Andy Li", 6000, 4000, "Container vessels docked at a port"),
  containers: unsplash("1759272840538-ae4b07214c71", "shipping-containers-stacked-at-a-busy-port-at-sunset-fT4SwA83jH4", "harisillahi", "Haris Illahi", 5472, 3648, "Stacked shipping containers at a port"),
  drawingMeasure: unsplash("1581092160562-40aa08e78837", "engineer-measuring-technical-drawings-on-desk-WDCE0T4khsE", "thisisengineering", "ThisisEngineering", 5760, 3840, "Engineer measuring a technical drawing with a caliper"),
  scrapFittings: unsplash("1769012334805-eb47a65b5d54", "pile-of-rusty-metal-pipes-and-plumbing-parts-NIZCFGxjLzc", "eprouzet", "Eric Prouzet", 6240, 4160, "Collected metal fittings and pipe offcuts for recycling"),
  terminalBlocks: unsplash("1767514536570-83d70c024247", "electrical-wires-connected-with-yellow-terminal-blocks-zmZR_8trbE0", "vzickner", "Valentin Zickner", 6000, 4000, "Electrical conductors clamped in terminal blocks"),
  warehouse: unsplash("1689942010216-dc412bb1e7a9", "a-large-warehouse-filled-with-lots-of-pallets-OnbSOhz0oig", "afinisgroup", "AFINIS Group", 6000, 4000, "Warehouse with packed pallets ready for dispatch"),
  rulerParts: unsplash("1780034766288-9b436534d428", "schuck-group-ruler-with-metal-parts-and-technical-drawings-KCgTyuYE5JA", "raymond36", "Raymond Sime", 4261, 6392, "Steel rule, machined parts and technical drawings"),
  machiningClose: unsplash("1727292486169-33eba0865c99", "a-close-up-of-a-machine-that-is-working-on-a-piece-of-metal-j_kCqJ4KusY", "najoi_designer", "Guick", 3456, 5184, "Close-up of a tool working a metal part"),
  operatorLathe: unsplash("1644522248824-ed975fd9ee81", "a-man-working-on-a-machine-in-a-factory-LeMks09eu4U", "mickhenson101", "mick henson", 5472, 3648, "Machinist operating a lathe"),
  smallParts: unsplash("1625464733746-f884014c73bc", "silver-screw-driver-and-round-gold-coins-CKlMpMn28CA", "mastars", "Mastars", 3680, 2128, "Small turned brass and steel parts laid out"),
  brassMachining: unsplash("1676646693434-8ee684e8ba49", "a-machine-cutting-a-piece-of-metal-in-a-factory-bGekYLY40EU", "hoseinfayton", "hosein fayton", 3648, 5472, "Cutting tool machining a metal part with coolant"),
  chips: unsplash("1764114440880-9bdbfe570a4d", "metal-shavings-on-industrial-machinery-7k3IJac07RE", "zoshuacolah", "Zoshua Colah", 4886, 3867, "Metal chips collected on a machine bed"),
  barStock: unsplash("1763926062529-1edf8664c366", "metal-bars-stacked-neatly-in-a-warehouse-IR93Hx_ybg8", "zoshuacolah", "Zoshua Colah", 6000, 4000, "Bar stock stacked in a raw material store"),
  crew: unsplash("1764114909312-c27b89ec7223", "workers-operating-a-large-industrial-machine-together-V7BRdLkbzpY", "zoshuacolah", "Zoshua Colah", 3912, 5843, "Technicians operating an industrial machine together"),
  solarRoof: unsplash("1786913507799-0ddbb3e7dbb6", "industrial-warehouse-with-solar-roof-panels-G73Y_MLPmuI", "hdbernd", "Bernd Dittrich", 4096, 2763, "Industrial building with rooftop solar panels"),
  screwsPile: unsplash("1647427060142-c18ea9536019", "a-pile-of-metal-screws-that-are-stacked-on-top-of-each-other-TnlsqwNhbCA", "simonkadula", "Simon Kadula", 5760, 3840, "Pile of machine screws"),
  inspector: unsplash("1747999827332-163aa33cd597", "a-man-measures-a-metal-component-carefully-EA7QL-GJWRM", "tecnic", "TECNIC Bioprocess Solutions", 7008, 4672, "Inspector measuring a metal component"),
  boltsSteel: unsplash("1564226591723-659ff3852b2a", "grey-stainless-steel-bolt-and-screw-lot-FDTEzCJ11fk", "martzzl", "Marcel Strauss", 5184, 3456, "Stainless steel bolts and screws"),
  castParts: unsplash("1723632670536-e3104577a19c", "a-couple-of-metal-parts-sitting-on-top-of-a-table-D60xwIqu-jA", "diecastingmould", "Diecasting Mould", 4032, 2688, "Machined metal housings on a table"),
  faucet: unsplash("1769356814886-abdadde25ea7", "antique-brass-bathtub-faucet-with-handheld-showerhead-lq8FnmruSjo", "claybanks", "Clay Banks", 3400, 2267, "Brass bath fitting with handheld shower"),
  gauges: unsplash("1744302570248-28dc28ea163a", "pressure-gauges-and-a-valve-are-shown-2VqtlU-9yQQ", "padrinan", "Miguel Angel Padrinan Alba", 5878, 3908, "Pressure gauges and valve on a gas line"),
  engine: unsplash("1527383418406-f85a3b146499", "car-engine-bay-VurHDpO4VYI", "timmossholder", "Tim Mossholder", 7500, 5000, "Automotive engine bay"),
  hvac: unsplash("1667983453881-4992fe86ab1b", "air-conditioning-units-on-grey-wall-994AH40vmVs", "kienday", "Kien Nguyen", 4032, 2688, "Air conditioning outdoor units on a wall"),
  circuit: unsplash("1518770660439-4636190af475", "macro-photography-of-black-circuit-board-FO7JIlwjOtU", "alexkixa", "Alexandre Debieve", 5530, 3687, "Macro view of a circuit board"),
  tractor: unsplash("1718470684824-3c53a74523bc", "a-tractor-plowing-a-field-with-a-plow-cfD0LrqEMmk", "samuel_solcan", "Samuel Solcan", 6000, 4000, "Tractor ploughing a field"),
  gears: unsplash("1606337321936-02d1b1a4d5ef", "metal-gears-and-mechanical-machine-parts-w95Fb7EEcjE", "npi", "Pavel Neznanov", 3000, 4000, "Assorted gears and mechanical parts"),
  switchbox: unsplash("1566417110090-6b15a06ec800", "gray-power-switch-box-maXnRLszYY0", "esptroy", "Troy Bridges", 4032, 3024, "Electrical distribution switch box"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
