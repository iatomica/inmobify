const https = require('https');
const token = "2|b2RMIwGwkX5wVxLUP4BLveASs9oS5l5l8RCXlusKf3e85ecf";

function request(path, method, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'devops.iatomica.com',
      port: 443,
      path: '/api/v1' + path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  const res = await request('/applications/public', 'POST', {
    project_uuid: "ggg00ksoo40c8s8osg0c0koo",
    server_uuid: "qgogwkwcwwgwoo4s8c080wgs",
    environment_name: "production"
  });
  console.log('Errors:', JSON.stringify(res.body, null, 2));
}

main().catch(console.error);
