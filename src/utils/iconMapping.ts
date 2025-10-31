// src/utils/iconMapping.ts
import { 
  BarChart3, 
  FileText,
  Settings,
  Users,
  BookOpen,
  Zap,
  Code,
  Database,
  Shield,
  Globe,
  Home,
  HelpCircle,
  Plus,
  Search,
  Filter,
  LogOut,
  User,
  ChevronDown,
  CheckCircle,
  XCircle,
  Info,
  Edit3,
  Trash2,
  type LucideIcon
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  'bar-chart-3': BarChart3,
  'file-text': FileText,
  'settings': Settings,
  'users': Users,
  'book-open': BookOpen,
  'zap': Zap,
  'code': Code,
  'database': Database,
  'shield': Shield,
  'globe': Globe,
  'home': Home,
  'help-circle': HelpCircle,
  'plus': Plus,
  'search': Search,
  'filter': Filter,
  'log-out': LogOut,
  'user': User,
  'chevron-down': ChevronDown,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'info': Info,
  'edit-3': Edit3,
  'trash-2': Trash2,
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || BarChart3;
};