import PostProcessing from './PostProcessing';
import QualityCheck from './QualityCheck';

export default interface Part {
  id?: number;
  ownership: string;
  manufacturedBy: string;
  designedBy: string;
  process: string;
  processParameters: string;
  manufacturingDate: string;
  postProcessing?: PostProcessing[];
  qualityCheck?: QualityCheck[];
}
