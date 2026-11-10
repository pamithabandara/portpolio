import { spawn } from "child_process";
import path from "path";

async function runTests() {
  console.log("🚀 Starting Next.js production server for validation testing...");
  
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

  const server = spawn(process.execPath, [nextBin, "start", "-p", "3000", "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: "pipe",
    env: { ...process.env, PORT: "3000" },
  });

  server.stdout.on("data", (data) => {
    console.log(`[Next.js]: ${data.toString().trim()}`);
  });

  server.stderr.on("data", (data) => {
    console.error(`[Next.js Error]: ${data.toString().trim()}`);
  });

  // Wait for server to become ready
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch("http://127.0.0.1:3000");
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch (e) {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!ready) {
    console.error("❌ Server failed to start within timeout.");
    server.kill();
    process.exit(1);
  }

  console.log("✅ Next.js server is up and listening on http://127.0.0.1:3000!");

  let passed = 0;
  let total = 0;

  async function check(name, url, expectedStatus, method = "GET", body = null) {
    total++;
    try {
      const options = { method, headers: {} };
      if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      if (res.status === expectedStatus) {
        console.log(`✅ [${res.status}] ${name}`);
        passed++;
        return res;
      } else {
        console.error(`❌ [${res.status} (expected ${expectedStatus})] ${name}`);
        return res;
      }
    } catch (e) {
      console.error(`❌ [ERROR] ${name}:`, e.message);
      return null;
    }
  }

  // Test 1: Public Homepage
  await check("Public Portfolio Homepage", "http://127.0.0.1:3000", 200);

  // Test 2: Project Case Study Page
  await check("Project Case Study: Drive Lean Plant Quality", "http://127.0.0.1:3000/projects/drive-lean-plant-quality-ftt-dashboard", 200);

  // Test 3: Admin Login Page
  await check("Admin Login UI", "http://127.0.0.1:3000/admin/login", 200);

  // Test 4: Protected Admin Overview (Should redirect or be unauthorized without cookie)
  const protectedCheck = await fetch("http://127.0.0.1:3000/admin", { redirect: "manual" });
  total++;
  if (protectedCheck.status === 307 || protectedCheck.status === 302 || protectedCheck.status === 401) {
    console.log(`✅ [${protectedCheck.status}] Protected Admin Overview redirects unauthorized visitor`);
    passed++;
  } else {
    console.error(`❌ [${protectedCheck.status}] Admin route was not protected`);
  }

  // Test 5: Contact API Submission
  await check("Contact API Form Submission", "http://127.0.0.1:3000/api/contact", 200, "POST", {
    name: "MAS QA Recruitment Team",
    email: "recruitment@masholdings.com",
    subject: "Data Analyst Position Interview",
    message: "Chamoth, we reviewed your Power BI dashboards and Lean quality analytics portfolio and would like to invite you for an interview.",
  });

  // Test 6: Admin Login Authentication API
  const loginRes = await check("Admin Login API with Valid Credentials", "http://127.0.0.1:3000/api/auth/login", 200, "POST", {
    email: "pamithabandara123@gmail.com",
    password: "AdminPassword2026!",
  });

  let authCookie = null;
  if (loginRes) {
    const rawCookie = loginRes.headers.get("set-cookie");
    if (rawCookie) {
      authCookie = rawCookie.split(";")[0];
      console.log("✅ Authenticated Session Cookie issued:", authCookie.substring(0, 35) + "...");
    }
  }

  // Test 7: Protected Admin Stats API using the session cookie
  if (authCookie) {
    total++;
    const statsRes = await fetch("http://127.0.0.1:3000/api/admin/stats", {
      headers: { Cookie: authCookie },
    });
    if (statsRes.status === 200) {
      const stats = await statsRes.json();
      console.log(`✅ [200] Authenticated Admin Stats API: ${stats.projectsCount} projects, ${stats.skillsCount} skills, ${stats.totalMessagesCount} messages`);
      passed++;
    } else {
      console.error(`❌ [${statsRes.status}] Authenticated Admin Stats API failed`);
    }
  }

  console.log(`\n🎉 Test Suite Completed: ${passed}/${total} passed!`);

  server.kill();
  process.exit(passed === total ? 0 : 1);
}

runTests();
