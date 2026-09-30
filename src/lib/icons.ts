import {
  BadgeCheck,
  Box,
  CalendarClock,
  Car,
  Cog,
  Crosshair,
  Disc3,
  Drill,
  Droplets,
  Flame,
  Grid3x3,
  Handshake,
  Layers,
  MessageSquareText,
  MessagesSquare,
  PackageCheck,
  PencilRuler,
  RadioTower,
  Recycle,
  RefreshCw,
  Snowflake,
  Sparkles,
  Spline,
  Tractor,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Content files reference icons by name so they stay framework-free. */
const registry: Record<string, LucideIcon> = {
  BadgeCheck,
  Box,
  CalendarClock,
  Car,
  Cog,
  Crosshair,
  Disc3,
  Drill,
  Droplets,
  Flame,
  Grid3x3,
  Handshake,
  Layers,
  MessageSquareText,
  MessagesSquare,
  PackageCheck,
  PencilRuler,
  RadioTower,
  Recycle,
  RefreshCw,
  Snowflake,
  Sparkles,
  Spline,
  Tractor,
  Wrench,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Cog;
}

/** One stroke width across the whole site. */
export const ICON_STROKE = 1.5;
