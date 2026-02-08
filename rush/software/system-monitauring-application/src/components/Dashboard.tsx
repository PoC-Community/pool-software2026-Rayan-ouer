import { PidTable } from "./PidTable"
import { ProgressLine } from "./LoadingComponent"
import { CpuChartPieDonut } from "./CpuComponent"
import { RamChartPieDonut } from "./RamComponent"
import { ChartRadialStacked } from "./NetworkComponent"
import { useQuery } from '@tanstack/react-query'
import { invoke } from "@tauri-apps/api/core";
import { ExportButton } from "./ExportButton"
import { Module, ModuleSchema } from "@/model/ModuleSchema"
import { Disk } from "@/model/diskSchema"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<Disk>();
const columns = [
  columnHelper.accessor("pid_name", {
    header: () => "Process",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("usage", {
    header: () => <p>Usage</p>,
    cell: (info) => info.getValue()
  }),
];

export default function DashboardSystem() {
    const { data, isLoading, error} = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
                const raw = await invoke<Module>("get_module");
                const res = ModuleSchema.parse(raw);
                return res
        },
        refetchInterval: 500,
        refetchIntervalInBackground: true
    })
    if (isLoading)
        return <ProgressLine />
    if (error || data === undefined)
        return <div>Error: {(error as Error).message}</div>
    return (
      <SidebarProvider>
        <SidebarInset>
          <header className="relative flex h-16 items-center gap-2 px-4 shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-lg font-bold">
                      {data.host.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="text-lg font-bold">
                    <BreadcrumbPage>
                    </BreadcrumbPage>
                    {data.host.os}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                System Monitauring
                </div>
            </div>
          </header>
          <div className="flex">
          <main className="flex-1 p-4">
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <CpuChartPieDonut data={data.cpu}></CpuChartPieDonut>
                <ChartRadialStacked data={data.network}></ChartRadialStacked>
                <RamChartPieDonut data={data.memory} />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </main>
        <aside className="flex-[0.5]">
          <div className="w-full h-full flex-col justify-center items-center p-4 gap-4">
          <PidTable<Disk, any> data={(data.disk.pids_vec.sort((a, b) => b.usage > a.usage ? 1 : -1).slice(0, 20))} columns={columns}></PidTable>
          </div>
        </aside>
        </div>
        <footer className="w-full bg-muted/50 p-4 flex justify-end">
          <div className="mt-4">
            <ExportButton data={data}/>
            </div>
        </footer>
        </SidebarInset>
      </SidebarProvider>
    )
}

