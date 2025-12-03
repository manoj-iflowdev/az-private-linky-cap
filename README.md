# az-private-linky-cap
CAP Project to get you started with [SAP BTP Private Link Service for Azure](https://help.sap.com/viewer/product/PRIVATE_LINK/CLOUD/en-US).

Find my blog post series on the topic [here](https://blogs.sap.com/2021/12/29/getting-started-with-btp-private-link-service-for-azure/).

Additional Resources |
--- |
[Alternative Java Project using SAP Cloud SDK](https://github.com/MartinPankraz/az-private-linky) |
[Fiori Project using CAP or Java backend](https://github.com/MartinPankraz/az-products-ui) |
[iFlow example using CAP or Java backend](https://github.com/MartinPankraz/az-private-linky-integration-suite) |
[SAP's tutorial with CF CLI commands](https://developers.sap.com/tutorials/private-link-microsoft-azure.html) |
[SAP's official blog](https://blogs.sap.com/2021/06/28/sap-private-link-service-beta-is-available/) |
[SAP's Discovery Center Mission](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/05-PrivateLink)

We used the `/sap/opu/odata/sap/epm_ref_apps_prod_man_srv` OData service for this project.

## Project context
[Azure Private Link Service](https://docs.microsoft.com/en-us/azure/private-link/private-link-service-overview) allows private connectivity between resources running on Azure in different environments. That includes SAP's Business Technology Platform when provisioned on Azure. SAP made that functionality available via a CloudFoundry Service.

Meaning you get now a managed component to expose your SAP backends to BTP on Azure without the need for a Cloud Connector. We developed against S4 primarily but anything executable in a service behind the Azure load balancer would be reachable. That involves for instance ECC, BO, PI/PO, SolMan etc.

![Architecture overview](priv-lnk-overview.png)

## Getting Started from SAP Business Application Studio

- `npm install`
- Build mta (Right-Click mta.yaml)
- Deploy MTA archive (Right-Click mta_archives > az-private-linky-cap_1.0.0.mtar)
- Maintain your target on the deployed Destination service az-destinations
- For local testing from BAS use `cds bind az-private-linky-cap-srv -2 az-destinations` followed by `cds watch --profile hybrid`
- For resources only available from SAP Private Link open an SSH tunnel via CF. See [this blog post](https://blogs.sap.com/2021/10/05/btp-private-linky-swear-with-azure-how-do-i-debug-and-test-with-live-data/) for details.

For those of you looking to get into CAP authentication via XSUAA continue [here](https://blogs.sap.com/2020/03/02/using-postman-for-api-testing-with-xsuaa/)

## Destination config
key | value |
--- | --- |
Name | s4test |
URL | https://[your private hostname]/ |
Proxy Type | PrivateLink |
Authentication | whatever you have here. We tested Basic Auth initially |

If your version of the CloudSDK doesn't support the new ProxyType revert to "Internet". Be aware this is only a configuration issue and by no means does the traffic flow to the internet. It will be resolved by BTP Azure DNS directly to the private link.

### Additional Properties
key | value |
--- | --- |
sap-client | your client no |
TrustAll | true |
HTML5.DynamicDestination | true |
WebIDEEnabled | true |
WebIDEUsage | odata_abap |

TrustAll needed with https, because CAP v1 does not apply Destination custom trust store yet. See [part 7](https://blogs.sap.com/2021/12/01/btp-private-linky-swear-with-azure-how-to-setup-ssl-end-to-end-with-private-link-service/) of the series for details.

> Note: Consider [upgrading](https://sap.github.io/cloud-sdk/docs/js/guides/upgrade-to-version-2) the Cloud SDK for Javascript to support the new proxy type PrivateLink.

For questions, contributions, or discussions, please use the [GitHub Issues page](https://github.com/MartinPankraz/az-private-linky-cap/issues) of this repository.

## About the Maintainer

This project is currently maintained by Manoj Gali.

Manoj is a Senior SAP CPI Consultant with extensive experience in SAP integration technologies, including SAP CPI and PI/PO. He focuses on designing and optimizing scalable integration solutions for secure data exchange across enterprise systems.

For inquiries, please reach out via:
- **Email:** manoj.gali695@gmail.com