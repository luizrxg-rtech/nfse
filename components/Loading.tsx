import {Card, CardContent} from "@/components/ui/card";

export default function Loading({text}: {text: string}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-12 text-center">
        <CardContent>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-700 font-semibold text-lg">{text}</p>
        </CardContent>
      </Card>
    </div>
  );
}