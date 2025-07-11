'use client';

import {Card, CardContent} from "@/components/ui/card";
import {History} from "lucide-react";

export default function RecentActivity() {

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Atividades Recentes</h2>
      <Card className="border-0">
        <CardContent className="p-12">
          <div className="text-center text-gray-500 py-12">
            <History className="w-16 h-16 mx-auto mb-6 text-gray-300"/>
            <p className="text-lg font-medium">Nenhuma atividade recente</p>
            <p className="text-sm mt-3">Suas notas fiscais emitidas aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}