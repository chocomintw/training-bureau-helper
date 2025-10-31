import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolById } from '@/config/tools';
import VpatProcessor from '@/components/vpat-processor/vpatProcessor';
import ToolDetailPage from '@/components/tool-detail/toolDetailPage';
import NotFound from './notFound';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  
  if (!toolId) {
    return <NotFound />;
  }

  const tool = getToolById(toolId);

  if (!tool) {
    return <NotFound />;
  }

  // Special case: VPAT Processor has its own full-page component
  if (toolId === 'vpat-processor') {
    return <VpatProcessor />;
  }

  // For other tools, use the generic detail page
  return <ToolDetailPage tool={tool} />;
};

export default ToolPage;