import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import { useForm } from "react-hook-form";
import EditCompanyForm from "@/components//EditCompanyForm";
import { ScrollArea } from "./ui/scroll-area";

import { Button } from "./ui/button";
import { useMediaQuery } from "usehooks-ts";
import { CompanyData, TimelineEntry } from "@/app/[slug]/page";

type FormProps = {
  companyData: CompanyData;
};

type ResponsiveDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  companyData: CompanyData;
  Form: React.ComponentType<any>;
  title?: string;
  description?: string;
  selectedEntry?: TimelineEntry;
};

export function ResponsiveDialog({
  open,
  setOpen,
  companyData,
  Form,
  title = "Dialog Title",
  description = "Dialog Description",
  selectedEntry,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-auto max-w-7xl !min-w-4xl max-h-[80vh] scrollbar-hide">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Form
            companyData={companyData}
            setOpen={setOpen}
            selectedEntry={selectedEntry}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-h-[80vh] !scrollbar-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto px-4">
          <Form
            companyData={companyData}
            setOpen={setOpen}
            selectedEntry={selectedEntry}
          />
          {/* <EditCompanyForm companyData={companyData} className="" /> */}
        </ScrollArea>
        {/* <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="button-secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
