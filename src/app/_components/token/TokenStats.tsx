export type Links = {
  url: string;
  name: string;
};
// description: string;
// links: Links[];

export type TokenStatsProps = {
  hour24: number;
  day30: number;
  day60: number;
  year1: number;
  marketcap: number;
  fullydiluted: number;
};

export default function TokenStats({
  hour24,
  day30,
  day60,
  year1,
  marketcap,
  fullydiluted,
}: TokenStatsProps) {
  return (
    <>
      <div className="w-[600px] flex flex-col">
        <span className="">Stats</span>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col w-full items-start ">
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row">
                  <th className="pt-3 pb-[2px] w-32 flex flex-row justify-start">
                    <div className="h-5">
                      <span>1 Day</span>
                    </div>
                  </th>

                  <th className="pt-3 pb-[2px] w-32 flex justify-start">
                    <div className="h-5">
                      <span>1 Month</span>
                    </div>
                  </th>

                  <th className="pt-3 pb-[2px] w-32 flex justify-start">
                    <div className="h-5">
                      <span>2 Months</span>
                    </div>
                  </th>

                  <th className="pt-3 pb-[2px] w-32 flex justify-start">
                    <div className="h-5">
                      <span>1 Year</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex">
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{hour24}</span>
                    </div>
                  </td>
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{day30}</span>
                    </div>
                  </td>
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{day60}</span>
                    </div>
                  </td>
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{year1}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row">
                  <th className="pt-3 pb-[2px] w-32 flex flex-row justify-start">
                    <div className="h-5">
                      <span>Marketcap</span>
                    </div>
                  </th>

                  <th className="pt-3 pb-[2px] w-32 flex justify-start">
                    <div className="h-5">
                      <span>Fully Diluted</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex">
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{marketcap}</span>
                    </div>
                  </td>
                  <td className="pt-[2px] pb-3 w-32">
                    <div className="h-5">
                      <span>{fullydiluted}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
