import React from 'react';
import { DashboardIcon } from './DashboardIcon';
import { BriefcaseIcon } from './BriefcaseIcon';
import { BuildingIcon } from './BuildingIcon';
import { JobManagementIcon } from './JobManagementIcon';
import { UsersIcon } from './UsersIcon';
import { UserIcon } from './UserIcon';
import { CalendarIcon } from './CalendarIcon';
import { BarChartIcon } from './BarChartIcon';
import { FileTextIcon } from './FileTextIcon';
import { SettingsIcon } from './SettingsIcon';

interface IconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Get sidebar icon component by name
 * Maps icon names from navigation constants to icon components
 */
export function getSidebarIcon(iconName: string): React.ComponentType<IconProps> | null {
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    dashboard: DashboardIcon,
    briefcase: BriefcaseIcon,
    building: BuildingIcon,
    'job-management': JobManagementIcon,
    users: UsersIcon,
    user: UserIcon,
    calendar: CalendarIcon,
    'bar-chart': BarChartIcon,
    'file-text': FileTextIcon,
    settings: SettingsIcon,
  };

  return iconMap[iconName] || null;
}

