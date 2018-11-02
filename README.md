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

## Route

Adapt the source code and push to your git repository.
