<!DOCTYPE html>
<html>
  <head>
   <meta charset='utf-8' />
   <link rel="stylesheet" src="style.css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
   <script src="https://apis.google.com/js/client.js"></script>
   <script type="text/javascript">
var PROJECT_ID = ''; << id-ul tau de exemplu wave69-don
var CLIENT_ID = ''; //<< Aici inseram client ID 
var API_KEY = '';  //<< Aici inseram API key de la O2 AUTH Credentials
var SCOPES = 'https://www.googleapis.com/auth/compute';
var API_VERSION = 'v1';

var DEFAULT_PROJECT = PROJECT_ID;
var DEFAULT_ZONE = 'europe-west1-b'; // For example, us-central1-a

// Valori standard, se pot modifica dupa preferinte 

var DEFAULT_NAME = 'test-node1';
var GOOGLE_PROJECT = 'debian-cloud'; // project hosting a shared image
var DEFAULT_DISK_NAME = DEFAULT_NAME;
var DEFAULT_IMAGE_FAMILY = 'debian-9';

var BASE_URL = 'https://www.googleapis.com/compute/' + API_VERSION;
var PROJECT_URL = BASE_URL + '/projects/' + DEFAULT_PROJECT;
var GOOGLE_PROJECT_URL = BASE_URL + '/projects/' + GOOGLE_PROJECT;
var DEFAULT_DISK_URL = PROJECT_URL + '/zones/' + DEFAULT_ZONE +
  '/disks/' + DEFAULT_DISK_NAME;
var DEFAULT_IMAGE_URL = GOOGLE_PROJECT_URL + '/global/images/family/' +
  DEFAULT_IMAGE_FAMILY;

var DEFAULT_IMAGE_NAME = DEFAULT_NAME;
var DEFAULT_MACHINE_TYPE = 'https://www.googleapis.com/compute/v1/projects/<aici treci id-ul tau (wave-etc)>/global/machineTypes/e2-small'; 
// Atentie la DEFAULT MACHINE URL trecem si zona, la DEFAULT MACHINE TYPE nu mai trecem zona.
var DEFAULT_MACHINE_URL = "https://www.googleapis.com/compute/v1/projects/<aici treci id-ul tau (wave-etc)>//zones/<aici introduci zona>/machineTypes/e2-small";
var DEFAULT_NETWORK = "https://www.googleapis.com/compute/v1/projects/<aici treci id-ul tau (wave-etc)>//global/networks/default";

/**
 * Authorize Google Compute Engine API.
 */
function authorization() {
  gapi.client.setApiKey(API_KEY);
  gapi.auth.authorize({
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: false
  }, function(authResult) {
       if (authResult && !authResult.error) {
         initializeApi();
       } else {
         window.alert('Auth was not successful');
       }
     }
  );
}

/**
 * Load the Google Compute Engine API.
 */
function initializeApi() {
  gapi.client.load('compute', API_VERSION);
}

/**
 * Executes your Google Compute Engine request object and, subsequently,
 * prints the response.
 * @param {gapi.client.request} request A Google Compute Engine request
 *     object issued from the Google APIs JavaScript client library.
 * @param {string} apiRequestName The name of the example API request.
 */
function executeRequest(request, apiRequestName) {
  request.execute(function(resp) {
    newWindow = window.open(apiRequestName, '',
      'width=600, height=600, scrollbars=yes');
    newWindow.document.write('<h1>' + apiRequestName + '</h1> <br />' +
      '<pre>' + JSON.stringify(resp.result, null, ' ') + '</pre>');
    if (resp.error) {
      newWindow.document.write('<h1>Error:</h1>');
      newWindow.document.write('<pre>' +
        JSON.stringify(resp.error, null, ' ') + '</pre>');
    }
  });
}

/**
 * Google Compute Engine API request to delete your instance
 */
function deleteInstance() {
  var request = gapi.client.compute.instances.delete({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_IMAGE_NAME
  });
  executeRequest(request, 'deleteInstance');
}

/**
 * Google Compute Engine API request to delete your disk
 */
function deleteDisk() {
  var request = gapi.client.compute.disks.delete({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'disk': DEFAULT_DISK_NAME
  });
  executeRequest(request, 'deleteDisk');
}

/**
 * Google Compute Engine API request to get your instance
 */
function getInstance() {
  var request = gapi.client.compute.instances.get({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'instance': DEFAULT_IMAGE_NAME
  });
  executeRequest(request, 'getInstance');
}

/**
 * Google Compute Engine API request to insert a disk into your cluster.
 */
function insertDisk() {
  var request = gapi.client.compute.disks.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'sourceImage': DEFAULT_IMAGE_URL,
    'resource': {
      'name': DEFAULT_DISK_NAME
    }
  });
  executeRequest(request, 'insertDisk');
}

/**
 * Google Compute Engine API request to insert your instance with metadata
 */
function insertInstanceWithMetadata() {
  resource = {
    'image': DEFAULT_IMAGE_URL,
    'name': 'node-with-metadata',
    'machineType': DEFAULT_MACHINE_URL,
    'disks': [{
     'source': DEFAULT_DISK_URL,
     'type': 'PERSISTENT',
     'boot': true
    }],
    'networkInterfaces': [{
      'network': DEFAULT_NETWORK
    }],
    'metadata': {
      'items': [{
        'value': 'apt -y install apache2',
        'key': 'startup-script'
      }]
    }
  };
  var request = gapi.client.compute.instances.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'resource': resource
  });
  executeRequest(request, 'insertInstance');
}

/**
 * Google Compute Engine API request to insert your instance
 */
function insertInstance() {
  resource = {
    'image': DEFAULT_IMAGE_URL,
    'name': DEFAULT_IMAGE_NAME,
    'machineType': DEFAULT_MACHINE_URL,
    'disks': [{
     'source': DEFAULT_DISK_URL,
     'type': 'PERSISTENT',
     'boot': true
    }],
    'networkInterfaces': [{
      'network': DEFAULT_NETWORK
    }]
  };
  var request = gapi.client.compute.instances.insert({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'resource': resource
  });
  executeRequest(request, 'insertInstance');
}

/**
 * Google Compute Engine API request to retrieve the list of global
 * operations (inserts, deletes, etc.) for your Google Compute Engine
 * project.
 */
function listGlobalOperations() {
  var request = gapi.client.compute.globalOperations.list({
    'project': DEFAULT_PROJECT
  });
  executeRequest(request, 'listGlobalOperations');
}

/**
 * Google Compute Engine API request to retrieve the list of operations
 * (inserts, deletes, etc.) for your Google Compute Engine project.
 */
function listZoneOperations() {
  var request = gapi.client.compute.zoneOperations.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE
  });
  executeRequest(request, 'listZoneOperations');
}

/**
 * Google Compute Engine API request to retrieve a filtered list
 *  of instances in  your Google Compute Engine project.
 */
function listInstancesWithFilter() {
  var request = gapi.client.compute.instances.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE,
    'filter': 'status ne TERMINATED'
  });
  var apiRequestName = 'listInstancesWithFilter';
  executeRequest(request, apiRequestName);
}

/**
 * Google Compute Engine API request to retrieve the list of instances in
 * your Google Compute Engine project.
 */
function listInstances() {
  var request = gapi.client.compute.instances.list({
    'project': DEFAULT_PROJECT,
    'zone': DEFAULT_ZONE
  });
  executeRequest(request, 'listInstances');
}

/**
 * Driver for sample application.
 */
$(window).load(authorization);
    </script>
  </head>
  <body>
   <header>
      <h1>Google Compute Engine JavaScript Client Library Application</h1>
    </header>
    <button onclick="listInstances()">List Instances</button>
    <button onclick="listInstancesWithFilter()">List Instances with Filter</button>
    <button onclick="listZoneOperations()">List Zone Operations</button>
    <button onclick="listGlobalOperations()">List Global Operations</button>
    <button onclick="insertDisk()">Insert a Disk</button>
    <button onclick="insertInstance()">Insert an Instance</button>
    <button onclick="insertInstanceWithMetadata()">Insert Instance with Metadata</button>
    <button onclick="getInstance()">Get an Instance</button>
    <button onclick="deleteInstance()">Delete an Instance</button>
    <button onclick="deleteDisk()">Delete a disk</button>
  </body>
</html>
