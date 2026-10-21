/**
 * Photography registry.
 *
 * TODO: Every image below is a PLACEHOLDER from Unsplash (free licence, credit kept for courtesy).
 * The photos are downloaded into /public/images (2400px wide, WebP) so they are served and resized by
 * this site, not fetched from Unsplash on every visit.
 * Replace each entry with real Akshay Enterprise factory, machine and product photography:
 *   1. drop the file into /public/images/...
 *   2. use a plain object with `src` set to the local path (e.g. "/images/factory/turning-bay.webp")
 *   3. update width/height/alt and leave out `credit`.
 * Photos show in original colour by default; <Photo treatment="duotone"> adds the brass-toned look where a section needs it.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: { name: string; profile: string; photo: string };
};

function unsplash(
  file: string,
  id: string,
  slug: string,
  username: string,
  name: string,
  width: number,
  height: number,
  alt: string,
): Photo {
  return {
    src: `/images/${file}`,
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
  lathe: unsplash("lathe.webp", "1666634157070-6fd830fb5672", "metal-rod-machining-on-lathe-eaanLTG7TCU", "sven_daniel", "Sven Daniel", 2400, 1600, "Metal bar held in a lathe chuck while a cutting tool turns its diameter"),
  latheTurret: unsplash("lathe-turret.webp", "1666618090858-fbcee636bd3e", "a-close-up-of-a-machine-DV_rG1mjDxs", "sven_daniel", "Sven Daniel", 2400, 1600, "Close-up of a lathe tool turret and chuck"),
  cncCutting: unsplash("cnc-cutting.webp", "1713371398484-cc4e4f6a262a", "a-machine-that-is-cutting-a-piece-of-metal-O5rSp_U-Pa0", "jelly1024", "Jelifer Maniago", 2400, 1350, "CNC spindle machining a metal workpiece"),
  millCutting: unsplash("mill-cutting.webp", "1740209475472-aa7d280f7452", "a-machine-that-is-cutting-a-piece-of-metal-sxtClAGwRck", "zhengjialuminum", "aluminum Zheng ji", 2400, 1602, "Machining centre cutting a metal block"),
  brassParts: unsplash("brass-parts.webp", "1636624679304-232a9ca54736", "a-pile-of-gold-colored-objects-on-a-table-ALvgGEl8mEE", "mons", "Ivan Di", 2400, 1800, "Batch of machined brass components"),
  brassNuts: unsplash("brass-nuts.webp", "1648113139950-4ea1237f6d84", "a-close-up-of-many-screws-and-nuts-Dh3EHnVJuR4", "dilliwalarider", "Shail Sharma", 2400, 1600, "Rows of brass threaded fittings and nuts"),
  partsOnDrawing: unsplash("parts-on-drawing.webp", "1769147339214-076740872485", "two-metal-mechanical-parts-on-engineering-blueprints-SRqJ3eli-4I", "encatapd", "EnCata PD", 2400, 1350, "Two machined parts resting on engineering drawings"),
  caliperPart: unsplash("caliper-part.webp", "1758873263563-5ba4aa330799", "hands-using-a-digital-caliper-to-measure-metal-part-_luiFaaZU6k", "hanswestbeek", "Hans Westbeek", 2400, 1600, "Digital caliper measuring a machined metal part"),
  factoryLine: unsplash("factory-line.webp", "1717386255767-52643970d483", "a-factory-with-a-lot-of-machines-in-it-5hPe-Tr2wog", "homaappliances", "Homa Appliances", 2400, 1601, "Production hall with rows of machines"),
  terminalBlocks: unsplash("terminal-blocks.webp", "1767514536570-83d70c024247", "electrical-wires-connected-with-yellow-terminal-blocks-zmZR_8trbE0", "vzickner", "Valentin Zickner", 2400, 1600, "Electrical conductors clamped in terminal blocks"),
  warehouse: unsplash("warehouse.webp", "1689942010216-dc412bb1e7a9", "a-large-warehouse-filled-with-lots-of-pallets-OnbSOhz0oig", "afinisgroup", "AFINIS Group", 2400, 1600, "Warehouse with packed pallets ready for dispatch"),
  rulerParts: unsplash("ruler-parts.webp", "1780034766288-9b436534d428", "schuck-group-ruler-with-metal-parts-and-technical-drawings-KCgTyuYE5JA", "raymond36", "Raymond Sime", 2400, 3600, "Steel rule, machined parts and technical drawings"),
  machiningClose: unsplash("machining-close.webp", "1727292486169-33eba0865c99", "a-close-up-of-a-machine-that-is-working-on-a-piece-of-metal-j_kCqJ4KusY", "najoi_designer", "Guick", 2400, 3600, "Close-up of a tool working a metal part"),
  operatorLathe: unsplash("operator-lathe.webp", "1644522248824-ed975fd9ee81", "a-man-working-on-a-machine-in-a-factory-LeMks09eu4U", "mickhenson101", "mick henson", 2400, 1600, "Machinist operating a lathe"),
  brassMachining: unsplash("brass-machining.webp", "1676646693434-8ee684e8ba49", "a-machine-cutting-a-piece-of-metal-in-a-factory-bGekYLY40EU", "hoseinfayton", "hosein fayton", 2400, 3600, "Cutting tool machining a metal part with coolant"),
  chips: unsplash("chips.webp", "1764114440880-9bdbfe570a4d", "metal-shavings-on-industrial-machinery-7k3IJac07RE", "zoshuacolah", "Zoshua Colah", 2400, 1899, "Metal chips collected on a machine bed"),
  barStock: unsplash("bar-stock.webp", "1763926062529-1edf8664c366", "metal-bars-stacked-neatly-in-a-warehouse-IR93Hx_ybg8", "zoshuacolah", "Zoshua Colah", 2400, 1600, "Bar stock stacked in a raw material store"),
  crew: unsplash("crew.webp", "1764114909312-c27b89ec7223", "workers-operating-a-large-industrial-machine-together-V7BRdLkbzpY", "zoshuacolah", "Zoshua Colah", 2400, 3585, "Technicians operating an industrial machine together"),
  solarRoof: unsplash("solar-roof.webp", "1786913507799-0ddbb3e7dbb6", "industrial-warehouse-with-solar-roof-panels-G73Y_MLPmuI", "hdbernd", "Bernd Dittrich", 2400, 1619, "Industrial building with rooftop solar panels"),
  screwsPile: unsplash("screws-pile.webp", "1647427060142-c18ea9536019", "a-pile-of-metal-screws-that-are-stacked-on-top-of-each-other-TnlsqwNhbCA", "simonkadula", "Simon Kadula", 2400, 1600, "Pile of machine screws"),
  inspector: unsplash("inspector.webp", "1747999827332-163aa33cd597", "a-man-measures-a-metal-component-carefully-EA7QL-GJWRM", "tecnic", "TECNIC Bioprocess Solutions", 2400, 1600, "Inspector measuring a metal component"),
  boltsSteel: unsplash("bolts-steel.webp", "1564226591723-659ff3852b2a", "grey-stainless-steel-bolt-and-screw-lot-FDTEzCJ11fk", "martzzl", "Marcel Strauss", 2400, 1600, "Stainless steel bolts and screws"),
  castParts: unsplash("cast-parts.webp", "1723632670536-e3104577a19c", "a-couple-of-metal-parts-sitting-on-top-of-a-table-D60xwIqu-jA", "diecastingmould", "Diecasting Mould", 2400, 1600, "Machined metal housings on a table"),
  faucet: unsplash("faucet.webp", "1769356814886-abdadde25ea7", "antique-brass-bathtub-faucet-with-handheld-showerhead-lq8FnmruSjo", "claybanks", "Clay Banks", 2400, 1600, "Brass bath fitting with handheld shower"),
  gauges: unsplash("gauges.webp", "1744302570248-28dc28ea163a", "pressure-gauges-and-a-valve-are-shown-2VqtlU-9yQQ", "padrinan", "Miguel Angel Padrinan Alba", 2400, 1596, "Pressure gauges and valve on a gas line"),
  engine: unsplash("engine.webp", "1527383418406-f85a3b146499", "car-engine-bay-VurHDpO4VYI", "timmossholder", "Tim Mossholder", 2400, 1600, "Automotive engine bay"),
  hvac: unsplash("hvac.webp", "1667983453881-4992fe86ab1b", "air-conditioning-units-on-grey-wall-994AH40vmVs", "kienday", "Kien Nguyen", 2400, 1600, "Air conditioning outdoor units on a wall"),
  circuit: unsplash("circuit.webp", "1518770660439-4636190af475", "macro-photography-of-black-circuit-board-FO7JIlwjOtU", "alexkixa", "Alexandre Debieve", 2400, 1600, "Macro view of a circuit board"),
  tractor: unsplash("tractor.webp", "1718470684824-3c53a74523bc", "a-tractor-plowing-a-field-with-a-plow-cfD0LrqEMmk", "samuel_solcan", "Samuel Solcan", 2400, 1600, "Tractor ploughing a field"),
  gears: unsplash("gears.webp", "1606337321936-02d1b1a4d5ef", "metal-gears-and-mechanical-machine-parts-w95Fb7EEcjE", "npi", "Pavel Neznanov", 2400, 3200, "Assorted gears and mechanical parts"),
  switchbox: unsplash("switchbox.webp", "1566417110090-6b15a06ec800", "gray-power-switch-box-maXnRLszYY0", "esptroy", "Troy Bridges", 2400, 1800, "Electrical distribution switch box"),
  // premium replacements (darker, metal-focused), chosen to reduce repetition across products
  latheTurning: unsplash("lathe-turning.webp", "1570207344214-c60ad57f3c00", "gray-metal-lathe-machine-xNDB0o4_m-Q", "levi_midnight", "Denis Sebastian Tamas", 2400, 1800, "Steel bar being turned on a lathe, close-up of chuck and workpiece"),
  latheDark: unsplash("lathe-dark.webp", "1576142392214-a1794ffa0385", "macro-photography-of-gray-metal-machine-component-PlU-5rPzX_o", "fakurian", "Milad Fakurian", 2400, 1600, "Lathe spindle and tool post in close-up"),
  brassFittingsRow: unsplash("brass-fittings-row.webp", "1648113139966-0e4cd9855cf1", "a-bunch-of-yellow-and-silver-hoses-lined-up-together-Hn30_4Pt2P0", "dilliwalarider", "Shail Sharma", 2147, 3511, "Rows of machined brass threaded fittings"),
  machinedRings: unsplash("machined-rings.webp", "1548683726-203119be6a39", "a-large-group-of-metal-flanges-sitting-on-top-of-a-table-C2S_2gmmQlw", "aler", "alerkiv", 2400, 3060, "Rows of machined steel rings laid out on a table"),
  precisionPins: unsplash("precision-pins.webp", "1758873263428-f4b2edb45fe1", "rows-of-shiny-metal-components-on-a-textured-surface-fimoFLchbuk", "hanswestbeek", "Hans Westbeek", 2400, 1600, "Rows of precision-machined metal pins on a dark surface"),
  machinistLathe: unsplash("machinist-lathe.webp", "1565954786194-d22abeaac3ae", "mens-blue-denim-shirt-hTUdXgbhd3o", "movidagrafica", "Rafael Juárez", 2400, 1600, "Machinist operating a lathe in a workshop"),
  micrometerFlange: unsplash("micrometer-flange.webp", "1638875729378-e2221f0ec7bd", "a-person-is-working-on-a-metal-object-4eg-LQ5cGAE", "rothaargebirge", "Jessica Streser", 2400, 1349, "Micrometer measuring a machined brass flange"),
  dialIndicator: unsplash("dial-indicator.webp", "1713371398479-4410ca153b1f", "a-close-up-of-a-pressure-gauge-on-a-table-6PKMewe0Lds", "jelly1024", "Jelifer Maniago", 2400, 1350, "Dial indicator checking a machined part"),
  nutsOnBlack: unsplash("nuts-on-black.webp", "1549277512-89b1c704ffe8", "gray-pipe-fittings-_nQWGseKW4A", "dialex", "Diogo Nunes", 2400, 1800, "Steel hex nuts and washers on a black background"),
  copperDrilling: unsplash("copper-drilling.webp", "1645754884761-6ada0d53807b", "a-close-up-of-a-machine-with-a-piece-of-metal-on-it-pl95tzT0f7Y", "mastars2038", "mastars MT", 2400, 1600, "Copper part being drilled on a machining centre"),
  millingChips: unsplash("milling-chips.webp", "1551868561-f2cdee310ecf", "brass-color-tool-kB1BNcCcEnA", "mushonet", "Mushon Tamir", 2400, 1600, "Milling cutter with metal chips on a workpiece"),
  copperParts: unsplash("copper-parts.webp", "1645754884804-a65f5550ec1b", "a-row-of-lit-candles-sitting-on-top-of-a-table-sKUtjOEaTeg", "mastars2038", "mastars MT", 2400, 1600, "Machined copper electrical parts held in a fixture"),
  copperProfiles: unsplash("copper-profiles.webp", "1735406818135-72fc35b98960", "a-close-up-of-four-metal-tubes-on-a-black-background-3bv1G9DXY-Q", "pawel_czerwinski", "Pawel Czerwinski", 2400, 1600, "Copper extrusion profiles on a black background"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
