# etaw-knative

## Build

Make sure you are authorized to access the registry from your namepsace

**Adapt destination and git repository if needed in the [build.yaml](/build/build.yaml)**

```bash
kubectl create -f build/build.yaml
```

## Serve

Once the image is built, create your knative configuration

```bash
kubectl create -f configuration/configuration_v1.yaml
```

Create a route for you service to make it available for calls

```bash
kubectl create -f route/route_v1.yaml
```

To test if your service is properly running execute the following commands.
Retrieve the hostname that your service is deployed with

```bash
export SERVICE_HOST=`kubectl get route etaw-knative -n=default --output jsonpath="{.status.domain}"`
```

If you are running on **GKE** you can retrieve the public IP of the knative ingress-gateway with the command below

```bash
export SERVICE_IP=`kubectl get svc knative-ingressgateway --namespace istio-system \
--output jsonpath="{.status.loadBalancer.ingress[*].ip}"`
```

If you are running on **Minikube** retrieve the IP and the NodePort where the ingress-gateway is reachable

```bash
export SERVICE_IP=$(kubectl get po --selector knative=ingressgateway --namespace istio-system \
  --output 'jsonpath={.items[0].status.hostIP}'):$(kubectl get svc knative-ingressgateway --namespace istio-system \
  --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')
```

Call your service

```bash
curl --header "Host:$SERVICE_HOST" http://$SERVICE_IP
```

## Revision v2

Deploy the second configuration of your application, which will create a second revision with different environment variables.

```bash
kubectl create -f configuration/configuration_v2
```

## Routes

### Staging

Deploy the second route version

```bash
kubectl create -f route/route_v2.yaml
```

That elevates your second revision as stage deployment.
Curl will still show **Blue** (v1) as result

```bash
curl --header "Host:$SERVICE_HOST" http://$SERVICE_IP
```

But with the staging feature you can curl the second revision specifing the version number, the result should show **Green**

```bash
curl --header "Host:v2.$SERVICE_HOST" http://$SERVICE_IP
```

### Canary

Deploy the third route version

```bash
kubectl create -f route/route_v3.yaml
```

Curl should show equally often **Green** and **Blue** as result

```bash
curl --header "Host:$SERVICE_HOST" http://$SERVICE_IP
```

### Routing to new version

Deploy the fourth route version

```bash
kubectl create -f route/route_v4.yaml
```

The curl result shows only **Green** as result

```bash
curl --header "Host:$SERVICE_HOST" http://$SERVICE_IP
```
