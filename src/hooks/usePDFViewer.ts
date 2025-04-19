/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useContext } from 'react';
import { PDFViewerCtx } from '../contexts/PDFViewerContext';

const usePDFViewer = () => useContext(PDFViewerCtx);

export default usePDFViewer;
