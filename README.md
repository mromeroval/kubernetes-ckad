# Kubernetes-CKAD

## Lab for Certified Kubernetes Application Developer (CKAD)

This repository provides a step-by-step guide for setting up a Kubernetes cluster using minikube, specifically designed for practicing for the Certified Kubernetes Application Developer (CKAD) exam. The instructions are tailored for Ubuntu 22.04, but can be adapted for other Linux distributions.

## Setup the lab

Minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes. All you need is Docker (or similarly compatible) container or a Virtual Machine environment

### Minikube requirements

- 2 CPUs or more
- 2GB of free memory
- 20GB of free disk space
- Internet connection
- Container or virtual machine manager (such as Docker, Podman, etc)

Source:
> <https://minikube.sigs.k8s.io/docs/>

### Minikube Installation

> See source page for other Operating system, Architecture and Installer type

In my case I'm working with Ubuntu 22.04.5 LTS image mounted on VMware Fusion (Virtual Machine) on my personal Mac M3 as host.

To install the latest minikube stable release on ARM64 Linux using binary download:

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-arm64
sudo install minikube-linux-arm64 /usr/local/bin/minikube && rm minikube-linux-arm64
```

Start your cluster
From a terminal with administrator access run:

```bash
minikube start
```

#### Create custom cluster

By default, ` minikube start ` creates a cluster named “minikube”. If you would like to create a different cluster or change its name, you can use the ` --profile ` (or -p) flag, which will create a cluster with the specified name. Please note that you can have multiple clusters on the same machine.

```bash
minikube start --profile sandbox
```

To see the list of your current clusters, run:

```bash
minikube profile list
```

### Install kubectl

> Source page for detailed information: <https://kubernetes.io/docs/tasks/tools/>

To interact to the cluster we need kubectl. You must use a kubectl version that is within one minor version difference of your cluster. Using the latest compatible version of kubectl helps avoid unforeseen issues.

If you are on Ubuntu or another Linux distribution that supports the snap package manager, kubectl is available as a snap application.

```bash
snap install kubectl --classic
kubectl version --client
```

### Interact with the cluster

Check the workspace is ready.
List all the pods in all namespaces:

```bash
kubectl get pods -A
```

### Helm package manager

For custom installation visit Helm source page:

Source:
> https://helm.sh/docs/intro/install/>


1. Download your desired version
2. Unpack it (`tar -zxvf helm-v3.0.0-linux-amd64.tar.gz`)
3. Find the helm binary in the unpacked directory, and move it to its desired destination (`mv linux-amd64/helm /usr/local/bin/helm`)
4. Run `helm help` to confirm installation


### Working with Helm repositories

Helm comes with a powerful search command. It can be used to search two different types of source:

- `helm search hub` searches the Artifact Hub, which lists helm charts from dozens of different repositories.

- `helm search repo` searches the repositories that you have added to your local helm client (with helm repo add). This search is done over local data, and no public network connection is needed.

You can find publicly available charts by running `helm search hub`

To add a chart repository. Check Artifact Hub (https://artifacthub.io/packages/search) for available Helm chart repositories.

Example adding the bitnami repository

```bash
    helm repo add bitnami https://charts.bitnami.com/bitnami
```

List added repositories

```bash
    helm repo list
```

`helm search repo` reads through all of the repositories configured on the system, and looks for matches.

It will display the latest stable versions of the charts found. . If you want to search using a version constraint, use --version.

```bash   
# Search for the latest stable release for nginx with a major version of 17
 helm search repo nginx --version ^17.0.0
```

## Kubernetes architecture

- Control Plane: Manages the Kubernetes core services, including the API server, etcd (Kubernetes database), kube-scheduler, and kube-controller-manager. It can consist of one or multiple nodes for redundancy.
- Worker Nodes: Run the containerized applications using two core services: the container runtime (CRI) and the kubelet. These nodes execute the pods scheduled by the control plane.
- Core Components: The API server interacts with users via kubectl, etcd stores all Kubernetes resources, and the scheduler assigns pods to worker nodes.
