"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Eye, Filter, CheckCircle, Clock, XCircle } from "lucide-react";
import { PPDBRegistration } from "@/data/dummy";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function PPDBTableClient({
  initialData,
}: {
  initialData: PPDBRegistration[];
}) {
  const [data, setData] = React.useState<PPDBRegistration[]>(initialData);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [search, setSearch] = React.useState<string>("");

  // Load any registrations from localStorage as well
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sds_ppdb_registrations");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // merge unique by id
            const existingIds = new Set(initialData.map((d) => d.id));
            const newItems = parsed.filter((p: PPDBRegistration) => !existingIds.has(p.id));
            setData([...newItems, ...initialData]);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [initialData]);

  const filtered = data.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.parentName.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Semua ({data.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "pending"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Pending ({data.filter((d) => d.status === "pending").length})
          </button>
          <button
            onClick={() => setStatusFilter("verified")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "verified"
                ? "bg-sky-500 text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Terverifikasi ({data.filter((d) => d.status === "verified").length})
          </button>
          <button
            onClick={() => setStatusFilter("accepted")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "accepted"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Diterima ({data.filter((d) => d.status === "accepted").length})
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "rejected"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Ditolak ({data.filter((d) => d.status === "rejected").length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau no. reg..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-full text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="p-4">No. Registrasi</th>
                <th className="p-4">Nama Calon Siswa</th>
                <th className="p-4">Orang Tua / No. WA</th>
                <th className="p-4">Tanggal Daftar</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">
                    Tidak ada pendaftar yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">
                      {item.registrationNumber}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-foreground">{item.fullName}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {item.gender} • Asal: {item.previousSchool || "-"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{item.parentName}</div>
                      <div className="text-[11px] text-muted-foreground">{item.parentPhone}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          item.status === "accepted"
                            ? "accepted"
                            : item.status === "verified"
                            ? "verified"
                            : item.status === "rejected"
                            ? "rejected"
                            : "pending"
                        }
                      >
                        {item.status === "accepted"
                          ? "Diterima"
                          : item.status === "verified"
                          ? "Terverifikasi"
                          : item.status === "rejected"
                          ? "Ditolak"
                          : "Pending"}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/ppdb/${item.id}`}>
                        <Button size="sm" variant="default" className="text-xs h-8 px-3 font-semibold gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Verifikasi
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
