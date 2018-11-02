# knative-sessions

## Build

Make sure you are authorized to access the registry from your namepsace

**Adapt destination and git repository if needed in the [build.yaml](/build/build.yaml)**

```bash
kubectl create -f build/build.yaml
```

## Serve

Once the image is built, create your knative service

```bash
kubectl create -f service/service.yaml
```

To test if your service is properly running execute the following commands.
Retrieve the hostname that your service is deployed with

```bash
export SERVICE_HOST=`kubectl get route knative-sessions -n=default --output jsonpath="{.status.domain}"`
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

## Route

Adapt the source code and push to your git repository.

Update the name of the [build file](/build/build.yaml) so that it is recognized as new build.

```yaml
name: knative-sessions-build-v2
```

Increase the destination image tag inside the [build file](/build/build.yaml)

```yaml
- --destination=gcr.io/just-terminus-219317/knative-session-randomizer:2.0
```

Start the build again

```bash
kubectl create -f build/build.yaml
```

Once the build is done, apply the new service version

```bash
kubectl apply -f service/service_v2.yaml
```

You might recognize that a new revision of the service will be created but the when you try to curl it will still show the response of the first version.
