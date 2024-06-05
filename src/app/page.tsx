"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import SlideLoader from "@/components/skeleton-loader";

import { formatDecimalNumber } from "@/utils/helpers";
import FractalQfImg from "@/assets/blue_op_logo.svg";
import FractalRound1Img from "@/assets/green_op_logo.svg";
import FractalRound2Img from "@/assets/red_op_logo.svg";
import FractalRound3Img from "@/assets/purple_base_logo.svg";
import FractalMicroseedImg from "@/assets/yellow_op_logo.svg";
import FractalWhiteLogo from "@/assets/fractal_white_logo.svg";
import DetailsOPLogo from "@/assets/details_op_logo.svg";
import DetailsBaseLogo from "@/assets/details_base_logo.svg";

import homeStyles from "./home.module.scss";

type ChainIdType = 10 | 1 | 8453;
const ChainIdMap: Record<
  ChainIdType,
  "Ethereum Mainnet" | "OP Mainnet" | "Base"
> = { 1: "Ethereum Mainnet", 10: "OP Mainnet", 8453: "Base" };
type RoundType = {
  __typename: "Round";
  round_name: RoundKeysType;
  id: string;
  chainId: ChainIdType;
  matchAmount: string;
  matchAmountInUsd: number;
  totalDonationsCount: number;
  totalAmountDonatedInUsd: number;
  uniqueDonorsCount: number;
  matchTokenAddress: string;
};
type RoundsType = {
  fractal_visions_mission_1: RoundType;
  fractal_visions_mission_fund_1: RoundType;
  fractal_visions_mission_fund_2: RoundType;
  fractal_visions_microseed: RoundType;
  fractal_visions_mission_fund_3: RoundType;
};
type RoundKeysType = keyof RoundsType;

const GET_ROUNDS = gql(`
query RoundQuery {
   fractal_visions_mission_1:round(id: "5", chainId: 10) {
    id
    chainId
    matchAmount
    matchAmountInUsd
    totalAmountDonatedInUsd
    totalDonationsCount
    uniqueDonorsCount
     matchTokenAddress
  }
    fractal_visions_mission_fund_1: round(id: "0x795fe70088750873ad9feb0c63c496d88c53e817", chainId: 10) {
    id
    chainId
    matchAmount
    matchAmountInUsd
    totalAmountDonatedInUsd
    totalDonationsCount
    uniqueDonorsCount
     matchTokenAddress
  }

    fractal_visions_mission_fund_2:round(id: "0x135f474d35521348732e9947b246259754590959", chainId: 10) {
    id
    chainId
    matchAmount
    matchAmountInUsd
    totalAmountDonatedInUsd
    totalDonationsCount
    uniqueDonorsCount
     matchTokenAddress
  }

   fractal_visions_microseed:round(id: "0x6bc66fbd0b1cc13e2ba04b2c0950f9ca2b81f468", chainId: 10) {
    id
    chainId
    matchAmount
    matchAmountInUsd
    totalAmountDonatedInUsd
    totalDonationsCount
    uniqueDonorsCount
     matchTokenAddress
  }
    fractal_visions_mission_fund_3:round(id: "9", chainId: 8453) {
    id
    chainId
    matchAmount
    matchAmountInUsd
    totalAmountDonatedInUsd
    totalDonationsCount
    uniqueDonorsCount
     matchTokenAddress
  }
}`);

const missionCardStyles = {
  fractal_visions_mission_1: {
    background: "#092554",
    fontColor: "#0556DE",
    overlayBg: "#010E23",
    logoFill: "#0048C1",
    statCardBg: "#0e264e",
    card_title: "FV M1 QF Round",
    card_title_full: "FV Mission 1 Quadratic Funding",
    status: "ongoing",
    background_image: FractalQfImg,
  },
  fractal_visions_mission_fund_1: {
    background: "#145833",
    fontColor: "#06A24C",
    overlayBg: "#062D18",
    logoFill: "#16A055",
    statCardBg: "#245239",
    card_title: "FVMF Round 1",
    card_title_full: "FVMF Round 1",
    status: "closed",
    background_image: FractalRound1Img,
  },
  fractal_visions_mission_fund_2: {
    background: "#CC1F1F",
    fontColor: "#F85959",
    overlayBg: "#762D2D",
    logoFill: "#FF2A2A",
    statCardBg: "#A53737",
    card_title: "FVMF Round 2",
    card_title_full: "FVMF Round 2",
    status: "closed",
    background_image: FractalRound2Img,
  },
  fractal_visions_microseed: {
    background: "#f1e800",
    fontColor: "#FFF",
    overlayBg: "#ccb806",
    logoFill: "#0048C1",
    statCardBg: "#f1d800",
    card_title: "Micro SEED Round",
    card_title_full: "Micro SEED Round",
    status: "closed",
    background_image: FractalMicroseedImg,
  },
  fractal_visions_mission_fund_3: {
    background: "#912092",
    fontColor: "#FA13FC",
    overlayBg: "#422643",
    logoFill: "#0048C1",
    statCardBg: "#663E67",
    card_title: "FVMF Round 3",
    card_title_full: "FVMF Round 3",
    status: "active",
    background_image: FractalRound3Img,
  },
};

function getTokenSymbol(value: string) {
  const addressSymbol = {
    "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1": "DAI",
  };
  return addressSymbol[value as keyof typeof addressSymbol] ?? "N/A";
}

export default function Page() {
  const [roundsData, setRoundsData] = useState<RoundType[]>();
  const { data, error, loading } = useQuery<RoundsType>(GET_ROUNDS);

  const getRoundsArray = useCallback(() => {
    if (!data) return;
    let new_arr: RoundType[] = [];
    for (let round of Object.entries(data)) {
      let round_name = round[0] as RoundKeysType;
      new_arr.push({ ...round[1], round_name: round_name });
    }
    setRoundsData(new_arr);
  }, [data]);

  useEffect(() => {
    getRoundsArray();
  }, [getRoundsArray]);

  return (
    <>
      <h1 className="text-center font-semibold mt-7">
        FRACTAL VISIONS ALLO PROTOCOL{" "}
      </h1>
      <div className={homeStyles.rounds__container}>
        {loading || !data ? (
          <SlideLoader />
        ) : error ? (
          <p>Error</p>
        ) : (
          <>
            {roundsData &&
              roundsData?.map((mission, index) => {
                return (
                  <div
                    key={mission.id}
                    className={homeStyles.rounds__item__wrapper}
                    style={{
                      background: `${
                        missionCardStyles[mission.round_name].background
                      }`,
                    }}
                  >
                    <div
                      className={homeStyles.mission__wrapper}
                      style={{
                        background: `${
                          missionCardStyles[mission.round_name].background
                        }`,
                      }}
                    >
                      <Image
                        src={
                          missionCardStyles[mission.round_name].background_image
                        }
                        alt={"fractal-visions logo"}
                        width={273}
                        height={273}
                        className="absolute  top-10 -right-6"
                      />

                      {/* main wrapper */}
                      <div className="h-full w-full flex flex-col items-start justify-between px-7 py-10">
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            src={FractalWhiteLogo}
                            alt={"fractal-visions logo"}
                            width={35}
                            height={35}
                          />
                          <span className="text-[14px] font-bold z-[4]">
                            Fractal Visions PGF
                          </span>
                        </div>

                        {/* initial card */}
                        <div className="flex items-center justify-start gap-2 z-[4]">
                          <span
                            className="text-[32px] font-bold"
                            style={{
                              color: `${
                                missionCardStyles[mission.round_name].fontColor
                              }`,
                            }}
                          >
                            {index + 1}
                          </span>
                          <span className="text-[23px] lg:text-[29px] font-bold">
                            {missionCardStyles[mission.round_name].card_title}
                          </span>
                        </div>
                      </div>

                      {/* details wrapper */}
                      <div
                        className={homeStyles.mission__details__wrapper}
                        style={{
                          background: `${
                            missionCardStyles[mission.round_name].overlayBg
                          }`,
                        }}
                      >
                        {/*  details heading */}
                        <div className=" flex items-center justify-between">
                          <Image
                            src={FractalWhiteLogo}
                            alt={"fractal-visions logo"}
                            width={35}
                            height={35}
                          />
                          <div className="flex items-center justify-start gap-2">
                            <span
                              className={`inline-block px-3 py-[5px] rounded-[6px] capitalize ${
                                missionCardStyles[mission.round_name].status ===
                                  "active" ||
                                missionCardStyles[mission.round_name].status ===
                                  "ongoing"
                                  ? "text-[#13c725] bg-[#1a891b]/[0.45]"
                                  : "bg-[#bcbcbc] text-white"
                              } font-bold text-[10px] `}
                            >
                              {missionCardStyles[mission.round_name].status}
                            </span>
                            {/* <ChainLogos chainId="optimism" size={21} /> */}
                            <Image
                              src={
                                ChainIdMap[mission.chainId] === "OP Mainnet"
                                  ? DetailsOPLogo
                                  : DetailsBaseLogo
                              }
                              alt={"chain logo"}
                              width={21}
                              height={21}
                            />
                          </div>
                        </div>

                        {/* statistics */}
                        <div className="w-full mt-[35px]">
                          <h2 className="text-[18px] font-bold">
                            {
                              missionCardStyles[mission.round_name]
                                .card_title_full
                            }
                          </h2>
                          {/* stats cards */}
                          {/* matching pool */}
                          <div className="w-full flex items-start justify-center gap-2 flex-wrap mt-[20px]">
                            <div
                              className="w-full max-w-[140px] lg:max-w-[150px]  p-[15px] min-h-[110px] rounded-[20px]"
                              style={{
                                background: `${
                                  missionCardStyles[mission.round_name]
                                    .statCardBg
                                }`,
                              }}
                            >
                              <span
                                className="inline-block px-[7px] py-[6px] rounded-md text-[9px] font-bold"
                                style={{
                                  border: "1px solid rgba(103, 161, 255, 0.11)",
                                }}
                              >
                                Matching pool
                              </span>
                              <div className="w-full flex flex-col items-start justify-start mt-2">
                                <span className="text-[18px] lg:text-[21px] font-bold">
                                  {mission.round_name ===
                                  "fractal_visions_mission_1"
                                    ? `${formatDecimalNumber(
                                        Number(mission.matchAmount),
                                        mission.matchAmount.length < 16 ? 6 : 18
                                      ).toLocaleString()} ${getTokenSymbol(
                                        mission.matchTokenAddress
                                      )}`
                                    : "N/A"}
                                </span>
                                <span className="text-[11px] font-light">
                                  {mission.round_name ===
                                  "fractal_visions_mission_1"
                                    ? `$ ${mission.matchAmountInUsd}`
                                    : "-"}
                                </span>
                              </div>
                            </div>

                            {/* total usd crowdfunded */}
                            <div
                              className="w-full  max-w-[140px] lg:max-w-[150px] p-[15px] min-h-[110px] rounded-[20px]"
                              style={{
                                background: `${
                                  missionCardStyles[mission.round_name]
                                    .statCardBg
                                }`,
                              }}
                            >
                              <span
                                className="inline-block w-[min-content] px-[7px] py-[6px] rounded-md text-[9px] font-bold"
                                style={{
                                  border: "1px solid rgba(103, 161, 255, 0.11)",
                                }}
                              >
                                Total USD Crowdfunded
                              </span>
                              <p className="text-[18px] lg:text-[21px] font-bold mt-3">
                                $
                                {mission.totalAmountDonatedInUsd.toLocaleString()}
                              </p>
                            </div>

                            {/* total donations */}
                            <div
                              className="w-full  max-w-[140px] lg:max-w-[150px] p-[15px] min-h-[91px] rounded-[20px]"
                              style={{
                                background: `${
                                  missionCardStyles[mission.round_name]
                                    .statCardBg
                                }`,
                              }}
                            >
                              {" "}
                              <span
                                className="inline-block px-[7px] py-[6px] rounded-md text-[9px] font-bold"
                                style={{
                                  border: "1px solid rgba(103, 161, 255, 0.11)",
                                }}
                              >
                                Total Donations
                              </span>
                              <p className="text-[21px] font-bold mt-3">
                                {mission.totalDonationsCount}
                              </p>
                            </div>

                            {/* total donors */}
                            <div
                              className="w-full  max-w-[140px] lg:max-w-[150px] p-[15px] min-h-[91px] rounded-[20px]"
                              style={{
                                background: `${
                                  missionCardStyles[mission.round_name]
                                    .statCardBg
                                }`,
                              }}
                            >
                              {" "}
                              <span
                                className="inline-block px-[7px] py-[6px] rounded-md text-[9px] font-bold"
                                style={{
                                  border: "1px solid rgba(103, 161, 255, 0.11)",
                                }}
                              >
                                Total Donors
                              </span>
                              <p className="text-[21px] font-bold mt-3">
                                {mission.uniqueDonorsCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
}
