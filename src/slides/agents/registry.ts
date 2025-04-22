// /src/slides/agents/registry.ts
// created by ASDTS
import { 
    DocumentToSlidesAgent, 
    NewSlideAgent , 
    FirstSlideAgent , 
    ExportAgent , 
    SelectedAgent , 
    RegenerateAgent , 
    SummaryAgent , 
    InsertSlideAgent , 
    StylingAgent , 
    OutlineAgent
} from "./export";


export const AgentRegistry = {
    [FirstSlideAgent.name]: FirstSlideAgent,
    [NewSlideAgent.name]: NewSlideAgent,
    [ExportAgent.name]: ExportAgent,
    [SelectedAgent.name]: SelectedAgent,
    [RegenerateAgent.name]: RegenerateAgent,
    [SummaryAgent.name]: SummaryAgent,
    [InsertSlideAgent.name]: InsertSlideAgent,
    [StylingAgent.name]: StylingAgent,
    [OutlineAgent.name]: OutlineAgent,
    [DocumentToSlidesAgent.name]: DocumentToSlidesAgent,

};
