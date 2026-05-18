import { useState } from "react";

import {
  FaUsers,
  FaBed,
  FaCalendarAlt,
  FaDollarSign,
  FaUserPlus,
  FaPlus,
} from "react-icons/fa";

import { BarChart } from "@mui/x-charts/BarChart";

const stats = [
  {
    title: "Total Guests",
    value: "1,234",
    icon: <FaUsers />,
    color: "text-primary",
  },
  {
    title: "Available Rooms",
    value: "42",
    icon: <FaBed />,
    color: "text-success",
  },
  {
    title: "Reservations",
    value: "87",
    icon: <FaCalendarAlt />,
    color: "text-warning",
  },
  {
    title: "Revenue",
    value: "$124,500",
    icon: <FaDollarSign />,
    color: "text-secondary",
  },
];

const reservations = [
  {
    guest: "John Smith",
    room: "301",
    checkIn: "15/05",
    status: "Confirmed",
  },
  {
    guest: "Maria Garcia",
    room: "205",
    checkIn: "16/05",
    status: "Checked In",
  },
  {
    guest: "David Chen",
    room: "412",
    checkIn: "17/05",
    status: "Pending",
  },
];

const dataset = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 91 },
  { month: "May", value: 88 },
];

export default function Dashboard() {
  const [tickPlacement, setTickPlacement] =
    useState("middle");

  const [tickLabelPlacement, setTickLabelPlacement] =
    useState("middle");

  return (
    <div className="p-8 space-y-8 bg-base-100 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-base-content/60 mt-2">
            Hotel management overview
          </p>
        </div>

        <button className="btn btn-primary rounded-2xl">
          <FaPlus />
          New Reservation
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="
              card
              bg-base-100
              border
              border-base-300
              shadow-sm
              hover:shadow-xl
              transition-all
            "
          >
            <div className="card-body">

              <div
                className={`
                  text-3xl
                  ${item.color}
                `}
              >
                {item.icon}
              </div>

              <h2 className="card-title mt-4">
                {item.title}
              </h2>

              <p className="text-4xl font-bold">
                {item.value}
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* TABLE */}
        <div className="xl:col-span-2 card bg-base-100 border border-base-300 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between mb-4">

              <h2 className="card-title">
                Recent Reservations
              </h2>

              <button className="btn btn-sm btn-primary">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">

              <table className="table table-zebra">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-in</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {reservations.map((item, index) => (
                    <tr key={index}>

                      <th>{index + 1}</th>

                      <td>{item.guest}</td>

                      <td>{item.room}</td>

                      <td>{item.checkIn}</td>

                      <td>
                        <div
                          className={`
                            badge

                            ${
                              item.status === "Confirmed"
                                ? "badge-success"
                                : item.status === "Checked In"
                                ? "badge-info"
                                : "badge-warning"
                            }
                          `}
                        >
                          {item.status}
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="card bg-base-100 border border-base-300 shadow-sm">

          <div className="card-body">

            <h2 className="card-title mb-4">
              Quick Actions
            </h2>

            <ul className="menu bg-base-200 rounded-box p-0">

              <li>
                <a>
                  <FaUserPlus />
                  Add Guest
                </a>
              </li>

              <li>
                <a>
                  <FaCalendarAlt />
                  Register Reservation
                </a>
              </li>

              <li>
                <a>
                  <FaPlus />
                  Add Room
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">

        <div className="card-body">

          <div className="flex items-center justify-between mb-6">

            <h2 className="card-title">
              Occupancy Overview
            </h2>

            <div className="flex gap-2">

              <select
                className="select select-bordered select-sm"
                value={tickPlacement}
                onChange={(e) =>
                  setTickPlacement(e.target.value)
                }
              >
                <option value="middle">
                  Middle
                </option>

                <option value="start">
                  Start
                </option>

                <option value="end">
                  End
                </option>
              </select>

            </div>
          </div>

          <BarChart
            dataset={dataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                tickPlacement,
                tickLabelPlacement,
              },
            ]}
            series={[
              {
                dataKey: "value",
                label: "Occupancy %",
              },
            ]}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}