import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Loading() {
  return (
    <main className="h-full p-6 w-full">
      <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from(Array(8).keys()).map((item) => (
          <div className="w-72 h-60" key={item}>
            <Card className="h-full w-full flex flex-col ">
              <CardHeader>
                <CardTitle className="w-full h-3 rounded-md p-2 bg-primary-foreground animate-pulse" />
                <CardDescription className="w-1/2 h-6 rounded-md p-2 bg-primary-foreground animate-pulse" />
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-end">
                <div className="flex flex-col gap-2">
                  <div className="w-full h-3 rounded-md p-2 bg-primary-foreground animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
