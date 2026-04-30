import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import { $Status, $Planned } from './status';
import { CaseRow, CaseName, CaseDescription } from './case.styled';

export class $Test extends $Chemical {
    $name = '';
}

export class $Case extends $Test {
    $status: $Status = new $Planned();
    $description?: string;

    view(): ReactNode {
        const StatusComponent = $(this.$status);
        return (
            <CaseRow>
                <StatusComponent />
                <CaseName>{this.$name}</CaseName>
                {this.$description && <CaseDescription>{this.$description}</CaseDescription>}
            </CaseRow>
        );
    }
}

export class $PlannedCase extends $Case {
    $status: $Status = new $Planned();
}

export const Case = $($Case);
export const PlannedCase = $($PlannedCase);
