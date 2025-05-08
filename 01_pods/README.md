# Pods

## Introduction

- Pods as the Basic Unit: Pods are the minimal entity managed by Kubernetes, adding properties to containers that allow orchestration in a cluster or cloud environment.
- Pod Properties: Pods can include properties like nodeSelector, priority, and restartPolicy, and can also contain volumes for storage.
- Standalone Pods: While standalone pods are useful for testing and troubleshooting, they are not rescheduled in case of failure, cannot be scaled, and do not support rolling updates. For permanent applications, deployments and stateful sets are recommended.

```bash
kubectl explain pod.spec
```

### Application

To run a standalone pod, use a command like kubectl run podname --image=imagename.

### YAML manifest

In Kubernetes environments, DevOps focuses on consistently deploying applications through configuration as code, typically using YAML manifest files instead of command-line commands. This declarative approach allows multiple IT staff to run applications uniformly. While the declarative method is common in practice, exams may favor the faster imperative method using commands like `kubectl create`. YAML, a human-readable data serialization language, is ideal for managing configurations in systems like Kubernetes. Key components of a YAML file include `apiVersion`, `kind`, `metadata`, and `spec`, with `status` added automatically by the cluster. The `spec` section defines how resources are used, including container specifications such as name, image, command, and environment variables. To apply configurations, commands like `kubectl create -f`, `kubectl apply -f`, and `kubectl delete -f` are used, with `kubectl apply` being preferred for its ability to update existing resources without failure.

```bash
kubectl describe pods
```

Configuration as Code: In DevOps, it's essential to deploy applications consistently using configuration files (YAML files) rather than command-line inputs. This method is referred to as the declarative way of working with Kubernetes.
Declarative vs. Imperative: The declarative approach uses YAML files to define resources, while the imperative approach uses command-line commands. For the CKAD exam, both methods are important, but the imperative way can be faster.
kubectl Commands: Key commands include kubectl create -f to create resources from a YAML file, kubectl apply -f to update or create resources, and kubectl delete -f to remove resources. The kubectl explain command helps understand the properties of resources in YAML files.

To run a YAML configuration file in Kubernetes, you can use the command

```bash
kubectl create -f <filename>
```

where `<filename>` is the name of your YAML file (e.g., resource.yaml). However, if the resource already exists, this command will fail, making it less practical.

A better option is

```bash
kubectl apply -f <filename>
```

which creates resources and updates existing ones as needed without failing if no updates are required. Additionally

```bash
kubectl delete -f `<filename>
```

can be used to remove resources defined in the YAML file, while kubectl replace is a less common command that replaces the current resource with the specification in the YAML file.

```bash
kubectl create -f resource.yaml
```

Creates resources from the YAML file. If the resource already exists, it will fail.
kubectl apply -f resource.yaml: Creates or updates resources from the YAML file. If the resource exists, it updates the properties that need updating without giving a failure.
kubectl delete -f resource.yaml: Deletes the resources defined in the YAML file.
kubectl replace -f resource.yaml: Replaces the current resource with the specification in the YAML file, but it's less commonly used.

#### Generating YAML Files

Instead of writing YAML files manually, you should generate them using commands like kubectl run or kubectl create with the --dry-run=client -o yaml option.
Command Example: Use kubectl run mynginx --image=nginx --dry-run=client -o yaml > mynginx.yaml to generate a YAML file for an Nginx container.
Applying YAML Files: After generating the YAML file, you can apply it using kubectl apply -f mynginx.yaml to create the resources defined in the file.
Exploring Properties: Use kubectl explain pod.spec or kubectl explain pod.spec.containers to understand the properties you can set in the YAML file.

#### Namespaces

Purpose of Namespaces: Namespaces in Kubernetes leverage Linux kernel namespaces to provide resource isolation, enabling multi-tenancy and easier management of complex applications.
Security Settings: Namespaces help apply security settings like role-based access control (permissions) and quotas (restrictions).
Management: By installing complex applications in their own namespaces, managing related resources becomes easier.
Commands:
To show resources in all namespaces: kubectl get <resource> -A
To run resources in a specific namespace: kubectl run <resource> -n <namespace>
To create a namespace: kubectl create ns <namespace>

#### Pod troubleshooting

- Using kubectl commands:

kubectl get pods provides an overview of the current pod status.
kubectl describe pod [pod_name] gives detailed information about the pod status.
kubectl logs [pod_name] accesses the application output and error messages.
kubectl exec -it [pod_name] opens a shell on the pod for further analysis (if the pod is running).

- Troubleshooting steps:

Identify issues using kubectl describe and kubectl logs.
Investigate common errors like CrashLoopBackOff and missing environment variables.
Fix issues by setting necessary environment variables and restarting the pod.

- Example scenario:

The video demonstrates troubleshooting a MariaDB pod that fails due to a missing root password, showing how to set the environment variable correctly to resolve the issue.

### LAB Exercise

Create a YAML file that fulfills the following criteria:

1. First, define a namespace called microservice.
2. Next, create a pod named 'microdb' that utilizes the mariadb image, and ensure it runs within this namespace.
3. Finally, implement these resources using a declarative approach.

### Solution
