'use client'
import useAppStore from "@/app/UseAppStore";

export default function handler(req: { method: string; body: { value: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [setColor] = useAppStore((s) => ([s.setColorData])) 

  if (req.method === "POST") {
    const { value } = req.body;
    console.log("Received value:", value);
    // Process the received value as needed
    res.status(200).json({ message: "Value received successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  } 
}
