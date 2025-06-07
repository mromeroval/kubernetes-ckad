# Kubernetes-CKAD

### Working with Helm repositories

#### Install

To install a new package, use the `helm install` command.
It takes two arguments: A custom release name, and the name of the chart you want to install.

```bash
helm install nginx-server bitnami/nginx
```

#### Customizing the Chart Before Installing

To see what options are configurable on a chart, use 'helm show values`

```bash
helm show values bitnami/nginx
```

You can then override any of these settings in a YAML formatted file, and then pass that file during installation.

```bash
helm install bitnami/nginx --version 20.0.0 --generate-name --values values.yaml
```


### Helm debug

When a Helm installation fails, it can be due to various reasons. Here are steps to debug the issue and identify the cause of the failure:
1. Check the Helm Release Status

    Command: `helm status <release-name>`
    Purpose: This command provides the current status of the release and may include error messages or conditions that explain why the installation failed.
    Using --debug can provide additional context about the release's state and any issues that may have occurred.
    `helm status <release-name> --debug`

2. Review the Helm Install Output

    If you ran the installation command with the --debug flag, review the output for any error messages or warnings that were displayed during the installation process.

3. Inspect Kubernetes Events

    Command: kubectl get events --sort-by=.metadata.creationTimestamp
    Purpose: This command lists events in your Kubernetes cluster, sorted by time. Look for any events related to the resources created by your Helm chart, as they may provide clues about what went wrong.

4. Inspect the Last Release History

    You can view the history of the release to see what changes were made.
    This will show you a list of revisions, their statuses, and timestamps. Look for the most recent failed revision
    `helm history <release-name>`


5. Validate Values and Templates

    Ensure that the values you provided during installation are correct. You can retrieve the values used in the release with:
        Command: helm get values <release-name>
    Validate your templates by rendering them:
        Command: helm template <release-name> <chart-directory>


6. Review Helm Chart Configuration

    Ensure that your Helm chart is correctly configured. Check for any missing or incorrect configurations in the values.yaml file or the templates.

7. Rollback if Necessary

    If the installation fails and you need to revert to a previous state, you can use:
        Command: helm rollback <release-name> <revision-number>
    This will revert the release to a previous successful state.
