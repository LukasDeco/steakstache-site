export default function Security() {
  return (
    <div className="flex flex-col gap-8 pt-4 row-start-2 text-neutral-900 justify-between items-center sm:items-start h-screen w-full min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="mt-[100px] flex justify-center items-center w-full">
        <div className="mt-12 max-w-3xl">
          <section>
            <h2 className="mb-4 text-3xl font-blac">Security</h2>
            <h3 className="mb-4 text-xl font-extrabold">
              Our Security Guidelines
            </h3>
            <h6 className="mb-4 text-lg">
              At SteakStache, we follow industry-leading security principles to
              protect our validators and your stake:
              <br />
              • Defense in Depth - Multiple layers of security controls protect
              critical systems
              <br />
              • Least Privilege Access - Team members only have access to what
              they need
              <br />• Continuous Monitoring - Real-time alerts and automated
              responses to threats
            </h6>
            <h3 className="mb-4 text-xl font-extrabold">
              Monitoring and Uptime
            </h3>
            <h6 className="mb-4 text-lg">
              Validator software and hardware are monitored around the clock 365
              days a year
            </h6>
            <h3 className="mb-4 text-xl font-extrabold">Server Location</h3>
            <h6 className="mb-4 text-lg">
              SteakStache servers are located in datacenters with top-tier
              security practices, power redundancy, and efficient temperature
              management.
            </h6>
            <h3 className="mb-4 text-xl font-extrabold">Login Access</h3>
            <h6 className="mb-4 text-lg">
              The SteakStache Mainnet & Testnet servers are only accessible via
              encrypted key methods.
            </h6>
          </section>
        </div>
      </main>
    </div>
  );
}
