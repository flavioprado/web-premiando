// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8443/api',
  baseUrlPix: 'http://localhost:8443',
  baseUrlLogin: 'http://localhost:8443/login',
  baseUrlLoginExists: 'http://localhost:8443',
  baseUserServiceUrl: 'http://localhost',
  baseGeoServiceUrl: 'http://localhost',
  baseCustomerServiceUrl: 'http://localhost',
  baseCrmServiceUrl: 'http://localhost',
  gmailRedirectUrl: 'http://localhost',
  baseEmailServiceUrl: 'http://localhost',
  baseProductServiceUrl: 'http://localhost',
};