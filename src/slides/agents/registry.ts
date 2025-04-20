import { NewSlideAgent } from "./export";
import { FirstSlideAgent } from "./export";
import { ExportAgent } from "./export";
import { SelectedAgent } from "./export";
import { RegenerateAgent } from "./export";
import { SummaryAgent } from "./export";
import { InsertSlideAgent } from "./export";
import { StylingAgent } from "./export";
import { OutlineAgent } from "./export";

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

};
