import { FC, useEffect, useState } from "react";
import axios from "axios";

type Bank = {
    bank_name: string;
    location: string;
    child_banks: Array<Bank>;
};

type BankModalProps = {
    bankName?: string;
    location?: string;
    childBanks?: Bank[];
};

const BankModel: FC<BankModalProps> = ({ bankName, location, childBanks }) => {
    return (
        <div>
            <input type="checkbox" />
            <div>{bankName}</div>
            <div>{location}</div>

            <div>
                {childBanks?.map((bank, index) => (
                    <BankModel
                        bankName={bank.bank_name}
                        location={bank.location}
                        childBanks={bank.child_banks}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

const BankStructure = () => {
    const [bankData, setBankData] = useState<Bank>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get("http://localhost:3000/bank-data");
            setBankData(data.data);
        }
        getData();
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [bankData]);

    {
        if (isLoading || !bankData) return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <BankModel
                    bankName={bankData?.bank_name}
                    location={bankData?.location}
                    childBanks={bankData.child_banks}
                />
            </div>
        </div>
    );
};

export default BankStructure;
