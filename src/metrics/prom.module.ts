import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import createMetricsPlugin from "apollo-metrics";
import { plugin as apolloTracingPlugin } from "apollo-tracing";
import { register } from "prom-client";

export const TRACING_PLUGIN_KEY = "TRACING_PLUGIN_KEY";
export const METRICS_PLUGIN_KEY = "METRICS_PLUGIN_KEY";

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    {
      provide: TRACING_PLUGIN_KEY,
      useValue: apolloTracingPlugin(),
    },
    {
      provide: METRICS_PLUGIN_KEY,
      useValue: createMetricsPlugin(register),
    },
  ],
  exports: [TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY],
})
export class PromModule {}
