# ConfigMap

## Overview
A **ConfigMap** is a Kubernetes API object that allows you to store non-confidential configuration data in key-value pairs. ConfigMaps enable you to separate configuration from application code, making your applications more portable and easier to manage across different environments.

## Key Features
- **Key-Value Storage**: ConfigMaps store data as key-value pairs, where each key is a string and the value can be a string, number, or complex structure (e.g., JSON, YAML).
- **Decoupling Configuration from Code**: Changes to configuration can be made without rebuilding application images, promoting better separation of concerns.
- **Environment Variables**: ConfigMaps can be used to set environment variables in your pods, allowing applications to access configuration data easily.
- **Volume Mounts**: ConfigMaps can be mounted as files in a pod, enabling applications to read configuration data from files.

## Creating a ConfigMap
You can create a ConfigMap using the `kubectl` command-line tool. Here’s an example of creating a ConfigMap from literal values:

```bash
kubectl create configmap my-config --from-literal=key1=value1 --from-literal=key2=value2
```

Alternatively, you can create a ConfigMap from a file:

```bash
kubectl create configmap my-config --from-file=path/to/config-file
```

## Using a ConfigMap
As Environment Variables

You can reference a ConfigMap in your pod specification to set environment variables:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    env:
    - name: MY_ENV_VAR
      valueFrom:
        configMapKeyRef:
          name: my-config
          key: key1
```

As Volume Mounts

You can also mount a ConfigMap as a volume in your pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: my-config
```

Updating a ConfigMap

To update a ConfigMap, you can use the kubectl edit command:

```bash
kubectl edit configmap my-config
```

Alternatively, you can apply changes from a file:

```bash
kubectl apply -f configmap.yaml
```
