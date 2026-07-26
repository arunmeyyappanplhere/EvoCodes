import {
  BrainCircuit,
  Layers,
  CloudCog,
  Smartphone,
  ShieldCheck,
  GitBranch,
  Radio,
  PenTool,
  Zap,
  Cloud,
  Code,
  Database,
  Globe,
  Lock,
  Cpu,
  Server,
  BarChart3,
  Monitor,
  Network,
  HardDrive,
  Wifi,
  Box,
  Settings,
  Terminal,
} from 'lucide-react'

// Extend this map with whatever icon names your admin panel lets people pick.
// Fallback is Zap so an unrecognized name never breaks the UI.
export const ICON_MAP = {
  BrainCircuit,
  Layers,
  CloudCog,
  Smartphone,
  ShieldCheck,
  GitBranch,
  Radio,
  PenTool,
  Zap,
  Cloud,
  Code,
  Database,
  Globe,
  Lock,
  Cpu,
  Server,
  BarChart3,
  Monitor,
  Network,
  HardDrive,
  Wifi,
  Box,
  Settings,
  Terminal,
}

export function resolveIcon(iconName) {
  return ICON_MAP[iconName] || Zap
}