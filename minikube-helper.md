## Minikube Setup

Start minikube:

```bash
minikube start --memory=8192 --cpus=4 \
--kubernetes-version=v1.11.3 \
--bootstrapper=kubeadm \
--extra-config=apiserver.enable-admission-plugins="LimitRanger,NamespaceExists,NamespaceLifecycle,ResourceQuota,ServiceAccount,DefaultStorageClass,MutatingAdmissionWebhook"
```

Create and enable a service account to push to [GCR](https://github.com/GoogleCloudPlatform/knative-build-tutorials/tree/master/docker-build)

# Curl service

Retrieve the IP of minikube and the Nodeport where the knative-ingressgateway is published with:

```bash
echo $(minikube ip):$(kubectl get svc knative-ingressgateway --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')
```

Call the service with:

```bash
curl -H "Host: etaw-knative.default.example.com" http://minikube_ip:nodePort  -w "\n"
```

Furthermore you need to change the kaniko image to cr.io/kaniko-project/executor:v0.1.0, cause the latest version can't handle the preconfigured service accounts with registry credentials.
