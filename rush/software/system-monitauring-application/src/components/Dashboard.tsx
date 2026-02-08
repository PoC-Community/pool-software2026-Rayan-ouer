import { DataTable } from "./PidTable"
import { ProgressLine } from "./LoadingComponent"
import { CpuChartPieDonut } from "./CpuComponent"
import { RamChartPieDonut } from "./RamComponent"
import { ChartRadialStacked } from "./NetworkComponent"
import { useQuery } from '@tanstack/react-query'
import { invoke } from "@tauri-apps/api/core";
import { ExportButton } from "./ExportButton"
import { Module, ModuleSchema } from "@/model/ModuleSchema"
import { DiskInfo } from "@/model/diskSchema"
import { Core } from "@/model/cpuSchema"
import { DiskProgressLine } from "./DiskComponent"
import { AlertComputer } from "@/model/alertSchema"
import { GpuRadialTemperature } from "./GpuComponent"

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
import { useState, useEffect} from "react"


const columnPidHelper = createColumnHelper<DiskInfo>();
const columnsPid = [
  columnPidHelper.accessor("pid_name", {
    header: () => "Process",
    cell: (info) => info.getValue(),
  }),

  columnPidHelper.accessor("usage", {
    header: () => <p>Usage</p>,
    cell: (info) => info.getValue()
  }),
];

const columnCoreHelper = createColumnHelper<Core>();
const column_core = [
	columnCoreHelper.accessor("name", {
		header: () => "Core",
		cell: (info) => info.getValue()
	}),

  columnCoreHelper.accessor("usage", {
	header: () => "Usage",
	cell: (info) => info.getValue().toString()
  })
]


export default function DashboardSystem() {
	const [ alert, setAlert ] = useState<AlertComputer[]>([]);
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

            <div className="flex items-center gap-2">
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
                    <BreadcrumbPage>{data.host.os}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
              System Monitoring
            </div>
            <BreadcrumbItem  className="ml-auto text-lg font-bold text-gray-500">
              {data.host.host_name}
            </BreadcrumbItem>
                 <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
          </header>
          <div className="flex">
          <main className="flex-1 p-4">
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <CpuChartPieDonut data={data.cpu} alert={alert}></CpuChartPieDonut>
                <ChartRadialStacked data={data.network}></ChartRadialStacked>
                <RamChartPieDonut data={data.memory} />
				<DataTable<Core, any> data={data.cpu.computer_cores} columns={column_core}></DataTable>
				<DiskProgressLine data={data.disk} />
				<GpuRadialTemperature data={data.gpu} />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </main>
        <aside className="flex-[0.5]">
          <div className="w-full h-full flex-col justify-center items-center p-4 gap-4">
          <DataTable<DiskInfo, any> data={(data.disk.pids_vec.sort((a, b) => b.usage > a.usage ? 1 : -1).slice(0, 23))} columns={columnsPid}></DataTable>
          </div>
        </aside>
        </div>
		<div className="fixed bottom-4 right-4 z-50">
			<ExportButton data={data} />
			</div>
        </SidebarInset>
      </SidebarProvider>
    )
}

