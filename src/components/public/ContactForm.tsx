"use client";

import * as React from "react";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { schoolInfo } from "@/data/dummy";
import { generateWhatsAppLink } from "@/lib/utils";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Halo Admin ${schoolInfo.name},

Perkenalkan saya: ${name}
Nomor Telepon: ${phone}
Topik: ${subject}

Pesan:
${message}`;

    const waUrl = generateWhatsAppLink(schoolInfo.whatsapp, formattedMessage);
    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank");
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg">
      <div className="mb-6 space-y-1">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Kirim Pesan Langsung ke WhatsApp Panitia
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Isi formulir singkat di bawah ini. Pesan Anda akan langsung diteruskan ke
          nomor WhatsApp resmi kami.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="font-heading text-base font-bold text-emerald-800">
            Pesan Berhasil Disiapkan!
          </h4>
          <p className="text-xs text-emerald-700 leading-relaxed">
            WhatsApp telah terbuka di tab baru Anda. Jika belum terbuka secara
            otomatis, klik tombol di bawah untuk melanjutkan percakapan.
          </p>
          <Button
            variant="whatsapp"
            onClick={() => setSubmitted(false)}
            className="font-bold text-xs"
          >
            Kirim Pesan Lainnya
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Nama Lengkap Anda *
            </label>
            <Input
              required
              placeholder="Contoh: Bapak Irfan Hakim"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Nomor WhatsApp Anda *
            </label>
            <Input
              required
              type="tel"
              placeholder="Contoh: 08123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Topik Pertanyaan *
            </label>
            <Input
              required
              placeholder="Contoh: Pendaftaran PPDB Gelombang 1 / Biaya Sekolah"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Isi Pesan / Pertanyaan *
            </label>
            <Textarea
              required
              rows={4}
              placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda ketahui..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="whatsapp"
            className="w-full font-bold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            Buka & Kirim Pesan via WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
