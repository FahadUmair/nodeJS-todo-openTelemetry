const otel = require('@opentelemetry/api')
const {
    MeterProvider,
    PeriodicExportingMetricReader,
    ConsoleMetricExporter
  } = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { PrometheusExporter }= require('@opentelemetry/exporter-prometheus');

const { HostMetrics } = require('@opentelemetry/host-metrics');

const prometheusPort=PrometheusExporter.DEFAULT_OPTIONS.port;
const prometheusEndpoint= PrometheusExporter.DEFAULT_OPTIONS.endpoint;

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "todo-service",
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
    })
  );


  const exporter = new PrometheusExporter(
    {
      startServer: true
    }, () => {
      console.log(`prometheus scrape endpoint: http://localhost:${prometheusPort}${prometheusEndpoint}`)
    }
  )

  const meterProvider=new MeterProvider();
  meterProvider.addMetricReader(exporter);

  const hostMetrics = new HostMetrics({ meterProvider, name: 'example-host-metrics' })
  hostMetrics.start()

// Set this MeterProvider to be global to the app being instrumented.
otel.metrics.setGlobalMeterProvider(meterProvider)