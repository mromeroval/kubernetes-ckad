# Deployments

## Introduction

A Kubernetes deployment is a resource object that manages the deployment and scaling of applications in a Kubernetes cluster. It allows users to specify the desired state of an application, including the number of replicas and the container images to use. Kubernetes then ensures that the current state matches the desired state by automatically handling updates, scaling, and rollbacks. This makes it easier to manage application lifecycle and maintain high availability.

### Labels

Kubernetes labels are key-value pairs attached to objects, such as pods, services, and deployments, that are used to organize and select subsets of these objects. Labels enable users to categorize resources based on attributes like environment (e.g., production, staging), version, or application type. They play a crucial role in managing and querying resources, allowing for efficient grouping, filtering, and selection through label selectors. This helps in organizing workloads and facilitating operations like scaling, monitoring, and routing traffic.

Creates a demo deployment to understand labels

```bash
kubectl create deployment demolabel 
```

Adds a new label to the created deployment

```bash
kubectl label deployment demolabel state=demo
```

Getting all the labels of the `demolable` deployment, we can see only the deployment was labeled as "demo".
This is because new labels are not inherited by resources that already exists.

Delete labels

```bash
kubectl label pod demolabel-[uuid] app-
```

### Scale deployment

Scale up or down with `--replicas` option

```bash
kubectl scale deployment [deployment-name] --replicas=4
```

### Update deployment

Kubernetes Deployments support two main update strategies: `Rolling Update` (the default, allowing for zero-downtime updates) and `Recreate` (which stops old Pods before starting new ones, potentially causing downtime). The choice of strategy depends on the specific needs and characteristics of the application being deployed:

Types of Update Strategies:

1. `Rolling Update` (Default)
    Gradually replaces old Pods with new ones.
    Ensures zero downtime during updates.

    Parameters:
    - maxUnavailable: Maximum number of Pods that can be unavailable during the update (absolute number or percentage).
    - maxSurge: Maximum number of Pods that can be created above the desired count during the update (absolute number or percentage).

2. `Recreate`:
    Stops all old Pods before starting new ones.
    Can lead to downtime during updates.
    Suitable for applications that cannot run multiple versions simultaneously.

Key Considerations:

Rolling Update is generally preferred for most applications to minimize downtime.
Recreate may be necessary for applications with strict state or compatibility requirements.

CKAD Exam Focus

- Be prepared to identify and configure Deployment strategies in YAML manifests.
- Understand the implications of each strategy on application behavior during updates.
- Familiarize yourself with the parameters that control the behavior of the Rolling Update strategy.

Create a deployment

```bash
kubectl create deployment nginx-update --image=nginx:1.17 --replicas=5
```

Update image of the deployment

```bash
kubectl set image deployments nginx-update nginx=nginx:1.18
```

### Rollout history

Deploy the rolling-update deployment

```bash
kubectl apply -f deployments/rolling-update.yaml
```

Check the rollout hisory

```bash
kubectl rollout history deployment 
```

It shows that no change has been done yet

```bash
deployment.apps/nginx-update

REVISION  CHANGE-CAUSE
1         <none>
```

Edit the deployment so it has a new update. Change can be done with `kubectl edit` to directly update the deployment, or by modifying the local yaml manifest and then using `kubectl apply`, or for example changing nginx version image with `kubectl set image`

*Best practice: update your yaml manifest and use `kubectl apply`. In our case you need to update the `rolling-update.yaml` file and change `nginx:1.17` to `nginx:1.18` to make an upgrade

```bash
kubectl apply -f deployments/rolling-update.yaml
```

After change is done, there will be a new revision in the rollout history

```bash
deployment.apps/nginx-update

REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```

And a new replicaset with 0 (zero) replicas will be stored

```bash
NAME                                DESIRED   CURRENT   READY
replicaset.apps/nginx-update-[id]       0         0       0
replicaset.apps/nginx-update-[id]       8         8       8
```

It is possible to check specific revision. In this case revision 2 has the lates update to `nginx:1.18`

```bash
kubectl rollout history deployment nginx-update --revision=2
```

```bash
deployment.apps/nginx-update with revision #2
Pod Template:
  Labels: app=nginx-update
    pod-template-hash=[hash-id]
  Containers:
   nginx:
    Image: nginx:1.18

... // more data

```

#### Rollout

To roll back (revert changes) we can use the `rollout undo` command, and use specific revision

```bash
kubectl rollout undo deployment nginx-update --to-revision=1

deployment.apps/nginx-update rolled back

```

the  `rollout undo` command is applicatble to `daemonset`, `deployment` and `statefulset`

#### StatefulSet

A StatefulSet is a workload API object designed to manage stateful applications. It provides unique identities and stable, persistent storage for each instance of an application, making it suitable for applications that require consistent network identities and stable storage, such as databases.

#### Key features

**Stable Network Identity**: Each pod in a StatefulSet has a unique, stable hostname that persists across rescheduling, allowing for reliable communication between instances.

**Ordered Deployment and Scaling**: Pods are created, updated, and deleted in a specific order, ensuring that the application can maintain its state and consistency during scaling operations.

**Persistent Storage**: StatefulSets can be associated with PersistentVolumeClaims, ensuring that each pod has its own persistent storage that remains intact even if the pod is deleted or rescheduled.

**Pod Management**: StatefulSets manage the deployment and scaling of pods, ensuring that the desired number of replicas is maintained and that they are deployed in the correct order.
StatefulSets are particularly useful for applications that require stable storage and network identities, such as databases (e.g., MySQL, PostgreSQL) and distributed systems (e.g., Kafka, Zookeeper). They help maintain the integrity and availability of stateful applications in a Kubernetes environment.
